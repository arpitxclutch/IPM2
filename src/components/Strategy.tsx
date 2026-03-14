import React from 'react';
import { motion } from 'motion/react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { STRATEGY_METRICS } from '../constants';

export const Strategy = ({ company }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-8"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Ansoff Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Ansoff Growth Matrix</h3>
        <div className="grid grid-cols-2 gap-4">
          {company.strategy.ansoff.map((item: any) => (
            <div key={item.quadrant} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-emerald-500/30 transition-all group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-white uppercase">{item.quadrant}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.priority === 'High' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">{item.assessment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive Positioning */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Competitive Positioning (Performance vs Price)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.5} />
              <XAxis type="number" dataKey="price" name="Price" unit="%" stroke="#71717a" fontSize={10} domain={[40, 100]} />
              <YAxis type="number" dataKey="performance" name="Performance" unit="%" stroke="#71717a" fontSize={10} domain={[40, 100]} />
              <ZAxis type="number" range={[100, 1000]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
              />
              <Scatter name="Competitors" data={company.strategy.competitivePositioning} fill="#10b981">
                <LabelList dataKey="name" position="top" fill="#fafafa" fontSize={10} offset={10} />
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pricing Strategy */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Pricing Strategy: Value-Based Premium</h3>
        <div className="space-y-4">
          {[
            { label: 'Premium Tier', strategy: 'Skimming', description: 'High-margin pricing for flagship offerings with unmatched performance.' },
            { label: 'Mid-Tier', strategy: 'Competitive', description: 'Balanced pricing to maintain market share against key competitors.' },
            { label: 'Enterprise / Solutions', strategy: 'Subscription/Lump', description: 'Combination of upfront hardware and recurring software revenue.' },
            { label: 'IP / Licensing', strategy: 'Royalty-Based', description: 'Fixed percentage of device selling price, creating high-margin floor.' }
          ].map((item, i) => (
            <div key={i} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white">{item.label}</span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase">{item.strategy}</span>
              </div>
              <p className="text-[10px] text-zinc-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution Channels */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Distribution & Ecosystem</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-1">85%</div>
            <div className="text-[10px] text-zinc-500 uppercase font-bold">Direct to OEM/Enterprise</div>
            <p className="text-[9px] text-zinc-600 mt-2">Strategic partnerships with key global players and Tier-1s.</p>
          </div>
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-1">15%</div>
            <div className="text-[10px] text-zinc-500 uppercase font-bold">Distributors/Retail</div>
            <p className="text-[9px] text-zinc-600 mt-2">Global distribution network for broader market reach and IoT modules.</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
          <h4 className="text-[10px] font-bold text-emerald-500 uppercase mb-2">Ecosystem Moat</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {company.name}'s integrated platform creates a unified ecosystem, ensuring long-term design wins and customer stickiness.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
      <h3 className="text-lg font-bold text-white mb-6">Porter's Generic Strategy: Differentiation</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 font-bold">01</div>
          <h4 className="font-bold text-zinc-200">Technology Leadership</h4>
          <p className="text-xs text-zinc-500 leading-relaxed">Unmatched performance-per-watt via proprietary architecture, enabling premium pricing power.</p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 font-bold">02</div>
          <h4 className="font-bold text-zinc-200">IP Licensing Moat</h4>
          <p className="text-xs text-zinc-500 leading-relaxed">Strong portfolio of standard essential patents creates a high-margin earnings floor.</p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 font-bold">03</div>
          <h4 className="font-bold text-zinc-200">Ecosystem Lock-in</h4>
          <p className="text-xs text-zinc-500 leading-relaxed">Integrated solutions across multiple verticals create high switching costs and long-term value.</p>
        </div>
      </div>
    </div>
  </motion.div>
);
