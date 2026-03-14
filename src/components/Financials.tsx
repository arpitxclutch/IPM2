import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { QCOM_FULL_DATA } from '../constants';

export const Financials = ({ company }: any) => {
  const currencySymbol = company.currency === 'INR' ? '₹' : '$';
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Revenue & EBIT Margin Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={company.financials}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.5} />
                <XAxis dataKey="year" stroke="#71717a" fontSize={10} />
                <YAxis yAxisId="left" stroke="#71717a" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#71717a" fontSize={10} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                  formatter={(val: any, name: string) => [name === 'Revenue' ? `${currencySymbol}${val.toLocaleString()}` : `${val}%`, name]}
                />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="ebitMargin" name="EBIT Margin" stroke="#fbbf24" strokeWidth={2} dot={{ r: 4 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Free Cash Flow (FCFF)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={company.financials}>
                <defs>
                  <linearGradient id="colorFcff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.5} />
                <XAxis dataKey="year" stroke="#71717a" fontSize={10} />
                <YAxis stroke="#71717a" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                  formatter={(val: any) => [`${currencySymbol}${val.toLocaleString()}`, 'FCFF']}
                />
                <Area type="monotone" dataKey="fcff" name="FCFF" stroke="#10b981" fillOpacity={1} fill="url(#colorFcff)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl text-white">Integrated 3-Statement Model</h3>
            <p className="text-zinc-500 text-xs mt-1">Historical and Projected Financials ({company.currency})</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg transition-colors border border-zinc-700">Export CSV</button>
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20">Audit Trail</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest sticky left-0 bg-zinc-950 z-10 w-64">Income Statement</th>
                {company.financials.map((d: any) => (
                  <th key={d.year} className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">{d.year}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 font-mono text-sm">
              {[
                { label: 'Total Revenue', key: 'revenue', indent: false },
                { label: 'Cost of Revenue', key: 'costOfRevenue', indent: true },
                { label: 'Gross Profit', key: 'grossProfit', indent: false, highlight: true },
                { label: 'R&D Expense', key: 'rdExpense', indent: true },
                { label: 'SG&A Expense', key: 'sgaExpense', indent: true },
                { label: 'EBIT (Operating Income)', key: 'ebit', indent: false, highlight: true },
                { label: 'Interest Expense', key: 'interestExpense', indent: true },
                { label: 'Net Income', key: 'netIncome', indent: false, highlight: true },
                { label: 'Diluted EPS', key: 'eps', indent: false, prefix: currencySymbol },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className={`p-4 text-zinc-400 font-sans font-medium sticky left-0 bg-zinc-900 group-hover:bg-zinc-800 transition-colors ${row.indent ? 'pl-8 text-xs' : 'text-sm'} ${row.highlight ? 'text-white font-bold' : ''}`}>
                    {row.label}
                  </td>
                  {company.financials.map((d: any) => (
                    <td key={d.year} className={`p-4 text-right ${row.highlight ? 'text-emerald-500 font-bold' : 'text-zinc-300'}`}>
                      {row.prefix || ''}{(d as any)[row.key].toLocaleString(undefined, { minimumFractionDigits: row.key === 'eps' ? 2 : 0 })}
                    </td>
                  ))}
                </tr>
              ))}
              
              <tr className="bg-zinc-950 border-y border-zinc-800">
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest sticky left-0 bg-zinc-950 z-10">Balance Sheet Items</th>
                {company.financials.map((d: any) => <th key={d.year} className="p-4" />)}
              </tr>

              {[
                { label: 'Cash & Equivalents', key: 'cash' },
                { label: 'Total Assets', key: 'totalAssets', highlight: true },
                { label: 'Total Debt', key: 'totalDebt' },
                { label: 'Total Stockholders Equity', key: 'totalEquity', highlight: true },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className={`p-4 text-zinc-400 font-sans font-medium sticky left-0 bg-zinc-900 group-hover:bg-zinc-800 transition-colors text-sm ${row.highlight ? 'text-white font-bold' : ''}`}>
                    {row.label}
                  </td>
                  {company.financials.map((d: any) => (
                    <td key={d.year} className={`p-4 text-right ${row.highlight ? 'text-emerald-500 font-bold' : 'text-zinc-300'}`}>
                      {currencySymbol}{(d as any)[row.key].toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}

              <tr className="bg-zinc-950 border-y border-zinc-800">
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest sticky left-0 bg-zinc-950 z-10">Cash Flow Metrics</th>
                {company.financials.map((d: any) => <th key={d.year} className="p-4" />)}
              </tr>

              {[
                { label: 'Cash from Operations (CFO)', key: 'cfo' },
                { label: 'Capital Expenditures', key: 'capex' },
                { label: 'Free Cash Flow (FCFF)', key: 'fcff', highlight: true },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className={`p-4 text-zinc-400 font-sans font-medium sticky left-0 bg-zinc-900 group-hover:bg-zinc-800 transition-colors text-sm ${row.highlight ? 'text-white font-bold' : ''}`}>
                    {row.label}
                  </td>
                  {company.financials.map((d: any) => (
                    <td key={d.year} className={`p-4 text-right ${row.highlight ? 'text-emerald-500 font-bold' : 'text-zinc-300'}`}>
                      {currencySymbol}{(d as any)[row.key].toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
