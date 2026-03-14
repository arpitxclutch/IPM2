import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Settings2, Info, Calculator } from 'lucide-react';

export const Valuation = ({ company }: any) => {
  const currencySymbol = company.currency === 'INR' ? '₹' : '$';
  const marketPrice = company.valuation.marketPrice;

  const [inputs, setInputs] = useState({
    revenueGrowth: 7.0,
    ebitMargin: 29.0,
    taxRate: 13.0,
    salesToCapital: 5.5,
    wacc: company.wacc.wacc,
    terminalGrowth: 4.0
  });

  const handleInputChange = (key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const dcfResults = useMemo(() => {
    const years = 7;
    const baseRevenue = company.financials[0].revenue;
    const shares = 1000; // Mock shares for simplicity
    const netDebt = company.financials[0].totalDebt - company.financials[0].cash;
    
    let currentRevenue = baseRevenue;
    let pvExplicit = 0;
    const fcffs = [];

    for (let i = 1; i <= years; i++) {
      currentRevenue *= (1 + inputs.revenueGrowth / 100);
      const ebit = currentRevenue * (inputs.ebitMargin / 100);
      const nopat = ebit * (1 - inputs.taxRate / 100);
      const reinvestment = (currentRevenue - (currentRevenue / (1 + inputs.revenueGrowth / 100))) / inputs.salesToCapital;
      const fcff = nopat - reinvestment;
      
      const df = Math.pow(1 + inputs.wacc / 100, i);
      pvExplicit += fcff / df;
      
      fcffs.push({ year: `Y${i}`, fcff: Math.round(fcff) });
    }

    const terminalFCFF = fcffs[years - 1].fcff * (1 + inputs.terminalGrowth / 100);
    const terminalValue = terminalFCFF / (inputs.wacc / 100 - inputs.terminalGrowth / 100);
    const pvTV = terminalValue / Math.pow(1 + inputs.wacc / 100, years);
    
    const ev = pvExplicit + pvTV;
    const equityValue = ev - netDebt;
    const intrinsicValue = equityValue / shares;

    return {
      pvExplicit,
      pvTV,
      enterpriseValue: ev,
      equityValue,
      intrinsicValue,
      fcffs,
      netDebt
    };
  }, [inputs, company]);

  const dcfBridgeData = [
    { name: 'PV Explicit', value: dcfResults.pvExplicit, fill: '#3b82f6' },
    { name: 'PV Terminal', value: dcfResults.pvTV, fill: '#10b981' },
    { name: 'Enterprise Value', value: dcfResults.enterpriseValue, fill: '#fafafa' },
    { name: 'Net Debt', value: -dcfResults.netDebt, fill: '#ef4444' },
    { name: 'Equity Value', value: dcfResults.equityValue, fill: '#10b981' }
  ];

  const sensitivityData = useMemo(() => {
    const waccs = [inputs.wacc - 1, inputs.wacc - 0.5, inputs.wacc, inputs.wacc + 0.5, inputs.wacc + 1];
    const growths = [inputs.terminalGrowth - 1, inputs.terminalGrowth - 0.5, inputs.terminalGrowth, inputs.terminalGrowth + 0.5, inputs.terminalGrowth + 1];
    
    return waccs.map(w => ({
      wacc: w.toFixed(2),
      values: growths.map(g => {
        const years = 7;
        const baseRevenue = company.financials[0].revenue;
        const shares = 1000;
        const netDebt = company.financials[0].totalDebt - company.financials[0].cash;
        let currentRevenue = baseRevenue;
        let pvExplicit = 0;
        let lastFCFF = 0;

        for (let i = 1; i <= years; i++) {
          currentRevenue *= (1 + inputs.revenueGrowth / 100);
          const ebit = currentRevenue * (inputs.ebitMargin / 100);
          const nopat = ebit * (1 - inputs.taxRate / 100);
          const reinvestment = (currentRevenue - (currentRevenue / (1 + inputs.revenueGrowth / 100))) / inputs.salesToCapital;
          const fcff = nopat - reinvestment;
          pvExplicit += fcff / Math.pow(1 + w / 100, i);
          lastFCFF = fcff;
        }

        const tv = (lastFCFF * (1 + g / 100)) / (w / 100 - g / 100);
        const pvTV = tv / Math.pow(1 + w / 100, years);
        return (pvExplicit + pvTV - netDebt) / shares;
      })
    }));
  }, [inputs, company]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Settings2 className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Model Inputs</h3>
          </div>
          
          {[
            { label: 'Rev. Growth (%)', key: 'revenueGrowth', min: 0, max: 20, step: 0.1 },
            { label: 'EBIT Margin (%)', key: 'ebitMargin', min: 15, max: 40, step: 0.1 },
            { label: 'Tax Rate (%)', key: 'taxRate', min: 10, max: 25, step: 0.1 },
            { label: 'Sales-to-Capital', key: 'salesToCapital', min: 1, max: 10, step: 0.1 },
            { label: 'WACC (%)', key: 'wacc', min: 6, max: 15, step: 0.01 },
            { label: 'Terminal Growth (%)', key: 'terminalGrowth', min: 0, max: 5, step: 0.1 },
          ].map((input) => (
            <div key={input.key} className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-zinc-500">{input.label}</span>
                <span className="text-emerald-500 font-mono">{(inputs as any)[input.key]}</span>
              </div>
              <input 
                type="range" 
                min={input.min} 
                max={input.max} 
                step={input.step}
                value={(inputs as any)[input.key]}
                onChange={(e) => handleInputChange(input.key, parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          ))}

          <div className="pt-4 border-t border-zinc-800">
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex gap-3">
              <Info className="w-4 h-4 text-zinc-500 shrink-0" />
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Adjust sliders to see real-time impact on intrinsic value. Terminal value is calculated using the Gordon Growth Method.
              </p>
            </div>
          </div>
        </div>

        {/* Chart & Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Intrinsic Value</div>
              <div className="text-4xl font-black text-white font-mono">{currencySymbol}{dcfResults.intrinsicValue.toFixed(2)}</div>
              <div className={`mt-2 text-xs font-bold px-2 py-1 rounded ${dcfResults.intrinsicValue > marketPrice ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {dcfResults.intrinsicValue > marketPrice ? 'UNDERVALUED' : 'OVERVALUED'}
              </div>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Enterprise Value</div>
              <div className="text-2xl font-black text-white font-mono">{currencySymbol}{(dcfResults.enterpriseValue / 1000).toFixed(1)}B</div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Margin of Safety</div>
              <div className="text-2xl font-black text-white font-mono">
                {(((dcfResults.intrinsicValue - marketPrice) / dcfResults.intrinsicValue) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">DCF Valuation Bridge ({currencySymbol}M)</h3>
                <div className="flex items-center gap-4 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-zinc-400">EXPLICIT</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-zinc-400">TERMINAL</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dcfBridgeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${currencySymbol}${v/1000}B`} />
                    <Tooltip 
                      cursor={{ fill: '#27272a' }}
                      contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                      formatter={(val: any) => [`${currencySymbol}${val.toLocaleString()}`, 'Value']}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {dcfBridgeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 overflow-hidden">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Sensitivity Analysis (WACC vs Terminal Growth)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 text-[10px] text-zinc-500 uppercase bg-zinc-950 border border-zinc-800">WACC \ g</th>
                      {[inputs.terminalGrowth - 1, inputs.terminalGrowth - 0.5, inputs.terminalGrowth, inputs.terminalGrowth + 0.5, inputs.terminalGrowth + 1].map(g => (
                        <th key={g} className="p-2 text-[10px] text-zinc-500 uppercase bg-zinc-950 border border-zinc-800">{g.toFixed(1)}%</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityData.map((row, i) => (
                      <tr key={i}>
                        <td className="p-2 text-[10px] font-bold text-zinc-400 bg-zinc-950 border border-zinc-800">{row.wacc}%</td>
                        {row.values.map((val, j) => (
                          <td key={j} className={`p-2 text-[10px] font-mono border border-zinc-800 ${val > marketPrice ? 'text-emerald-500 bg-emerald-500/5' : 'text-rose-500 bg-rose-500/5'}`}>
                            {currencySymbol}{val.toFixed(0)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
                <span>Market Price: {currencySymbol}{marketPrice.toFixed(2)}</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500/20 rounded" />
                    <span>Undervalued</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-rose-500/20 rounded" />
                    <span>Overvalued</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-white">Projected Free Cash Flow to Firm (FCFF)</h3>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {dcfResults.fcffs.map((f, i) => (
            <div key={i} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
              <div className="text-[10px] font-bold text-zinc-500 uppercase mb-1">{f.year}</div>
              <div className="text-sm font-mono font-bold text-white">{currencySymbol}{f.fcff.toLocaleString()}M</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
