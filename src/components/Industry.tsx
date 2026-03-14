import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Globe, 
  Zap, 
  ShieldCheck, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
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

const ICON_MAP: any = {
  Zap,
  Globe,
  ShieldCheck,
  Cpu
};

export const Industry = ({ company }: any) => {
  const industryData = company.industryData;
  const trends = company.industryTrends;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Segment Growth Rates & TAM
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{company.sector} Market 2025-2030</span>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="segment" 
                  type="category" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#27272a' }}
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="growth" radius={[0, 4, 4, 0]} barSize={20}>
                  {industryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.growth > 20 ? '#10b981' : '#3f3f46'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Industry Lifecycle</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The {company.sector} industry is transitioning from a cyclical growth phase to a structural growth phase driven by multi-decade digitisation trends.
            </p>
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Current Stage</div>
              <div className="text-xl font-bold text-emerald-500">Mature Growth</div>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Industry CAGR</div>
              <div className="text-xl font-bold text-white">8.6% <span className="text-xs font-normal text-zinc-500">thru 2032</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trends.map((trend: any, i: number) => {
          const Icon = ICON_MAP[trend.icon] || Zap;
          return (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                <Icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{trend.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  trend.impact === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {trend.impact} Impact
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">{trend.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
        <div className="max-w-3xl">
          <h3 className="text-xl font-bold text-white mb-4">Strategic Industry Outlook</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The global {company.sector} market is projected to see significant growth by 2032. {company.name} is well-positioned to capture this shift by scaling its core IP across high-growth verticals.
          </p>
          <button className="flex items-center gap-2 text-emerald-500 text-sm font-bold hover:gap-3 transition-all">
            Download Full Industry Report
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
