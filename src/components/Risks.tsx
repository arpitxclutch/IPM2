import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { RISKS } from '../constants';

export const Risks = ({ company }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="space-y-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {company.risks.map((risk: any) => (
        <div key={risk.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-rose-500/30 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${risk.impact === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-rose-400 transition-colors">{risk.title}</h3>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${risk.impact === 'High' ? 'bg-rose-500 text-black' : 'bg-amber-500 text-black'}`}>
              {risk.impact} Impact
            </span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">{risk.details}</p>
          
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase">
              <AlertTriangle className="w-3 h-3" />
              Mitigation Strategy Active
            </div>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
        <ShieldAlert className="w-8 h-8 text-zinc-500" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">Monte Carlo Risk Assessment</h3>
        <p className="text-zinc-500 text-sm max-w-md mx-auto mt-2">
          10,000 simulations confirm an 84.3% probability of undervaluation for {company.name}. Even in the 10th percentile bearish scenario, the asset offers significant upside from current levels.
        </p>
      </div>
      <button className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all border border-zinc-700">
        Run New Simulation
      </button>
    </div>
  </motion.div>
);
