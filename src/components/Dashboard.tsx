import React from 'react';
import { 
  TrendingUp, 
  Activity, 
  Zap, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Globe,
  Cpu,
  Layers
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';
import { VALUATION_SUMMARY } from '../constants';

const StatCard = ({ title, value, change, isPositive, icon: Icon, subtitle }: any) => (
  <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl hover:border-zinc-700 transition-all group">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-mono ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <div className="text-3xl font-bold font-mono text-white">{value}</div>
      <p className="text-[10px] text-zinc-600 font-medium uppercase">{subtitle}</p>
    </div>
  </div>
);

export const Dashboard = ({ company, price, priceHistory }: any) => {
  const currencySymbol = company.currency === 'INR' ? '₹' : '$';
  const marginOfSafety = (((company.valuation.intrinsicValue - price) / company.valuation.intrinsicValue) * 100).toFixed(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Intrinsic Value" 
          value={`${currencySymbol}${company.valuation.intrinsicValue}`} 
          change={`${marginOfSafety}%`} 
          isPositive={parseFloat(marginOfSafety) > 0} 
          icon={Zap}
          subtitle="DCF Base Case"
        />
        <StatCard 
          title="Market Price" 
          value={`${currencySymbol}${price.toFixed(2)}`} 
          change="1.24%" 
          isPositive={true} 
          icon={Activity}
          subtitle={`${company.ticker}`}
        />
        <StatCard 
          title="Margin of Safety" 
          value={`${marginOfSafety}%`} 
          change="Stable" 
          isPositive={parseFloat(marginOfSafety) > 0} 
          icon={Target}
          subtitle="Risk Buffer"
        />
        <StatCard 
          title="WACC" 
          value={`${company.wacc.wacc}%`} 
          change="0.0%" 
          isPositive={true} 
          icon={TrendingUp}
          subtitle="Discount Rate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-bold text-xl text-white">Live Market Trajectory</h3>
                <p className="text-zinc-500 text-xs">Real-time price action and volatility tracking</p>
              </div>
              <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                {['1H', '1D', '1W', '1M'].map(t => (
                  <button key={t} className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all ${t === '1D' ? 'bg-emerald-500 text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.5} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                    formatter={(val: any) => [`${currencySymbol}${val.toFixed(2)}`, 'Price']}
                  />
                  <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" />
                Company Intelligence
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-500">Lifecycle Stage</span>
                  <span className="text-xs font-bold text-emerald-500">Mature Growth</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-500">Industry</span>
                  <span className="text-xs font-bold text-white">{company.sector}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-500">Currency</span>
                  <span className="text-xs font-bold text-white">{company.currency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">Strategic Position</span>
                  <span className="text-xs font-bold text-white">Market Leader</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Competitive Advantages
              </h3>
              <div className="space-y-3">
                {[
                  "Strong Brand Equity",
                  "Global Distribution Network",
                  "Advanced R&D Capabilities",
                  "Strategic Partnerships"
                ].map((adv, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <span className="text-[11px] text-zinc-400">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col">
          <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            Investment Thesis
          </h3>
          <div className="flex-1 space-y-6">
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <div className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-2">Verdict: {parseFloat(marginOfSafety) > 15 ? 'Significantly Undervalued' : 'Fairly Valued'}</div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {company.name} represents a compelling opportunity with a {marginOfSafety}% margin of safety. The market is underestimating its long-term growth potential.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Pillar Performance</h4>
              {[
                { label: 'Market Dominance', value: 92, icon: Layers },
                { label: 'Growth Trajectory', value: 78, icon: Activity },
                { label: 'Innovation Index', value: 85, icon: Cpu }
              ].map(p => (
                <div key={p.label} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <p.icon className="w-3 h-3 text-zinc-500" />
                      <span className="text-zinc-400">{p.label}</span>
                    </div>
                    <span className="text-emerald-500">{p.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${p.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase font-bold mb-2">Analyst Sentiment</div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                ))}
              </div>
              <div className="flex justify-between mt-1 text-[8px] font-mono text-zinc-600">
                <span>BEARISH</span>
                <span>BULLISH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
