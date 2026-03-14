import React from 'react';
import { motion } from 'motion/react';
import { 
  PieChart as PieChartIcon, 
  ArrowUpRight,
  ArrowDownRight,
  Target,
  TrendingUp,
  Layers
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export const Segments = ({ company }: any) => {
  const currencySymbol = company.currency === 'INR' ? '₹' : '$';
  const segmentData = company.segments;
  const totalRevenue = segmentData.reduce((acc: number, curr: any) => acc + curr.value, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-500" />
              Revenue Breakdown by Segment
            </h3>
            <div className="text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Total Segment Revenue</div>
              <div className="text-xl font-black text-white">{currencySymbol}{(totalRevenue / 1000).toFixed(1)}B</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {segmentData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}M`, 'Revenue']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {segmentData.map((seg: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${seg.color}10` }}>
                      <Layers className="w-4 h-4" style={{ color: seg.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{seg.name}</div>
                      <div className="text-[10px] text-zinc-500 uppercase">{((seg.value / totalRevenue) * 100).toFixed(1)}% Share</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-white">{currencySymbol}{(seg.value / 1000).toFixed(1)}B</div>
                    <div className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${seg.growth > 10 ? 'text-emerald-500' : 'text-zinc-500'}`}>
                      {seg.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {seg.growth}% YoY
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Growth Drivers
          </h3>
          <div className="space-y-6">
            {segmentData.map((seg: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{seg.name} Growth</span>
                  <span className="text-emerald-500 font-bold">+{seg.growth}%</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000" 
                    style={{ width: `${Math.min(seg.growth * 2, 100)}%` }} 
                  />
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  Strategic focus on {seg.name.toLowerCase()} is driving significant value creation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          Segment Performance Comparison
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Bar dataKey="growth" name="YoY Growth" radius={[4, 4, 0, 0]} barSize={40}>
                {segmentData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
