import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  ShieldAlert,
  Zap,
  Globe,
  PieChart,
  Cpu,
  FlaskConical
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg text-left",
      active ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
    )}
  >
    <Icon className="w-5 h-5 shrink-0" />
    <span className="truncate">{label}</span>
  </button>
);

export const Sidebar = ({ activeTab, setActiveTab }: any) => (
  <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col">
    <div className="p-6 flex items-center gap-3">
      <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
        <TrendingUp className="w-5 h-5 text-black fill-current" />
      </div>
      <span className="font-bold text-lg tracking-tight text-white uppercase">Valuation Terminal</span>
    </div>

    <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
      <div className="px-4 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Intelligence</div>
      <SidebarItem icon={LayoutDashboard} label="Company Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
      <SidebarItem icon={Cpu} label="Industry Intel" active={activeTab === 'industry'} onClick={() => setActiveTab('industry')} />
      <SidebarItem icon={PieChart} label="Segment Analysis" active={activeTab === 'segments'} onClick={() => setActiveTab('segments')} />
      
      <div className="px-4 py-2 mt-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Financials</div>
      <SidebarItem icon={BarChart3} label="Terminal Model" active={activeTab === 'financials'} onClick={() => setActiveTab('financials')} />
      <SidebarItem icon={TrendingUp} label="Valuation Engine" active={activeTab === 'valuation'} onClick={() => setActiveTab('valuation')} />
      <SidebarItem icon={FlaskConical} label="Scenario Lab" active={activeTab === 'scenarios'} onClick={() => setActiveTab('scenarios')} />
      
      <div className="px-4 py-2 mt-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Strategy</div>
      <SidebarItem icon={Globe} label="Strategic Matrix" active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} />
      <SidebarItem icon={ShieldAlert} label="Risk Matrix" active={activeTab === 'risks'} onClick={() => setActiveTab('risks')} />
      
      <div className="px-4 py-2 mt-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Research</div>
      <SidebarItem icon={MessageSquare} label="AI Analyst" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
    </nav>

    <div className="p-4 border-t border-zinc-800">
      <div className="flex items-center gap-3 px-2 py-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">Live: QCOM.NAS</span>
      </div>
    </div>
  </aside>
);
