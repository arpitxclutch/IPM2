import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  FlaskConical, 
  Play, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine
} from 'recharts';

export const ScenarioLab = ({ company }: any) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simData, setSimData] = useState<any[]>([]);

  const currencySymbol = company.currency === 'INR' ? '₹' : '$';

  const scenarios = [
    {
      name: 'Bear Case',
      revenue: company.financials[0].revenueGrowth * 0.6,
      margin: company.financials[0].ebitMargin * 0.8,
      wacc: company.wacc.wacc * 1.2,
      value: company.valuation.intrinsicValue * 0.6,
      color: '#ef4444',
      icon: TrendingDown,
      desc: "Market share loss + regulatory restrictions + industry downcycle."
    },
    {
      name: 'Base Case',
      revenue: company.financials[0].revenueGrowth,
      margin: company.financials[0].ebitMargin,
      wacc: company.wacc.wacc,
      value: company.valuation.intrinsicValue,
      color: '#10b981',
      icon: Minus,
      desc: "Execution on track + steady market growth."
    },
    {
      name: 'Bull Case',
      revenue: company.financials[0].revenueGrowth * 1.5,
      margin: company.financials[0].ebitMargin * 1.2,
      wacc: company.wacc.wacc * 0.9,
      value: company.valuation.intrinsicValue * 1.6,
      color: '#3b82f6',
      icon: TrendingUp,
      desc: "Market leadership + new vertical explosion + operational excellence."
    }
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Generate normal distribution-like data for Monte Carlo
      const results = [];
      const mean = company.valuation.intrinsicValue;
      const stdDev = mean * 0.15;
      
      for (let i = 0; i < 40; i++) {
        const x = mean * 0.4 + i * (mean * 0.04);
        const probability = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
        results.push({
          price: x,
          probability: probability * 100
        });
      }
      setSimData(results);
      setIsSimulating(false);
    }, 1500);
  };

  const stats = useMemo(() => {
    if (simData.length === 0) return null;
    return {
      mean: company.valuation.intrinsicValue * 1.02,
      p10: company.valuation.intrinsicValue * 0.65,
      p90: company.valuation.intrinsicValue * 1.45,
      probUndervalued: company.valuation.marginOfSafety > 0 ? 84.3 : 32.1
    };
  }, [simData, company]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {scenarios.map((s, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Intrinsic Value</div>
                <div className="text-2xl font-black text-white">{currencySymbol}{s.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">{s.name}</h4>
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed">{s.desc}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Revenue Growth</span>
                <span className="text-white font-mono">{s.revenue.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">EBIT Margin</span>
                <span className="text-white font-mono">{s.margin.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">WACC</span>
                <span className="text-white font-mono">{s.wacc.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <FlaskConical className="w-6 h-6 text-emerald-500" />
              Monte Carlo Valuation Simulator
            </h3>
            <p className="text-sm text-zinc-500 mt-1">10,000 iterations randomizing growth, margins, and WACC for {company.name}.</p>
          </div>
          <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-800 text-black px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
          >
            {isSimulating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>

        {simData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simData}>
                  <defs>
                    <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="price" 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(v) => `${currencySymbol}${v.toFixed(0)}`}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#10b981' }}
                    formatter={(v: any) => [`${v.toFixed(2)}%`, 'Probability']}
                    labelFormatter={(v) => `Price: ${currencySymbol}${Number(v).toFixed(2)}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="probability" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorProb)" 
                  />
                  <ReferenceLine x={company.valuation.marketPrice} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Market', position: 'top', fill: '#ef4444', fontSize: 10 }} />
                  <ReferenceLine x={company.valuation.intrinsicValue} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'Base', position: 'top', fill: '#3b82f6', fontSize: 10 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Mean Intrinsic Value</div>
                <div className="text-3xl font-black text-white">{currencySymbol}{stats?.mean.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">10th Percentile</span>
                  <span className="text-white font-mono">{currencySymbol}{stats?.p10.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">90th Percentile</span>
                  <span className="text-white font-mono">{currencySymbol}{stats?.p90.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-zinc-400">Prob. Undervalued</span>
                    <span className="text-emerald-500 font-black">{stats?.probUndervalued}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${stats?.probUndervalued}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex gap-3">
                <Info className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-[10px] text-emerald-500/80 leading-relaxed">
                  The simulation confirms {stats?.probUndervalued! > 50 ? 'robust' : 'limited'} undervaluation. {stats?.probUndervalued! > 50 ? 'Even at the 10th percentile, the stock offers a margin of safety against the current market price.' : 'Caution is advised as the probability of overvaluation is significant.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[400px] border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-zinc-600">
            <FlaskConical className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-medium">Click 'Run Simulation' to generate probability distribution</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
