import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Settings,
  ChevronUp,
  Activity,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Financials } from './components/Financials';
import { Valuation } from './components/Valuation';
import { Strategy } from './components/Strategy';
import { Risks } from './components/Risks';
import { AIAnalyst } from './components/AIAnalyst';
import { Industry } from './components/Industry';
import { Segments } from './components/Segments';
import { ScenarioLab } from './components/ScenarioLab';
import { COMPANIES } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState('qualcomm');
  const company = COMPANIES[selectedCompanyId] || COMPANIES['qualcomm'];
  
  const [price, setPrice] = useState(company.valuation.marketPrice || 0);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);

  // Update price when company changes
  useEffect(() => {
    const newPrice = company.valuation.marketPrice || 0;
    setPrice(newPrice);
    const initialHistory = Array.from({ length: 30 }).map((_, i) => ({
      time: new Date(Date.now() - (30 - i) * 2000).toLocaleTimeString(),
      price: newPrice + (Math.random() - 0.5) * (company.currency === 'INR' ? 50 : 4)
    }));
    setPriceHistory(initialHistory);
  }, [selectedCompanyId]);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => {
        const change = (Math.random() - 0.5) * (company.currency === 'INR' ? 5 : 0.4);
        const newPrice = prev + change;
        
        setPriceHistory(history => {
          const newHistory = [...history, { time: new Date().toLocaleTimeString(), price: newPrice }];
          if (newHistory.length > 30) return newHistory.slice(1);
          return newHistory;
        });

        return newPrice;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [company.currency]);

  const currencySymbol = company.currency === 'INR' ? '₹' : '$';

  return (
    <div className="flex h-screen bg-black text-zinc-100 overflow-hidden terminal-grid font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-24 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-10 z-20">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold">Ticker</span>
                <select 
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  className="bg-emerald-500/10 text-emerald-500 border-none font-black font-mono text-xs px-2 py-0.5 rounded focus:ring-0 cursor-pointer"
                >
                  {Object.values(COMPANIES).map(c => (
                    <option key={c.id} value={c.id} className="bg-zinc-900 text-white">{c.ticker}</option>
                  ))}
                </select>
              </div>
              <h1 className="text-lg font-bold text-white mt-1 tracking-tight">
                {company.name} <span className="text-zinc-500 font-normal">({company.analyst})</span>
              </h1>
            </div>
            
            <div className="h-10 w-px bg-zinc-800" />
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Last Price</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono font-black text-white">{currencySymbol}{price.toFixed(2)}</span>
                  <span className="text-emerald-500 text-xs font-mono font-bold flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    <ChevronUp className="w-3 h-3" />
                    +1.24%
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Intrinsic</span>
                <span className="text-xl font-mono font-bold text-emerald-500">{currencySymbol}{company.valuation.intrinsicValue}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search Terminal (CMD+K)" 
                className="bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-11 pr-6 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-72 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-black" />
              </button>
              <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arpit" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-zinc-950/30 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <Dashboard key={`dashboard-${selectedCompanyId}`} company={company} price={price} priceHistory={priceHistory} />}
            {activeTab === 'industry' && <Industry key={`industry-${selectedCompanyId}`} company={company} />}
            {activeTab === 'segments' && <Segments key={`segments-${selectedCompanyId}`} company={company} />}
            {activeTab === 'valuation' && <Valuation key={`valuation-${selectedCompanyId}`} company={company} />}
            {activeTab === 'financials' && <Financials key={`financials-${selectedCompanyId}`} company={company} />}
            {activeTab === 'scenarios' && <ScenarioLab key={`scenarios-${selectedCompanyId}`} company={company} />}
            {activeTab === 'strategy' && <Strategy key={`strategy-${selectedCompanyId}`} company={company} />}
            {activeTab === 'risks' && <Risks key={`risks-${selectedCompanyId}`} company={company} />}
            {activeTab === 'ai' && <AIAnalyst key={`ai-${selectedCompanyId}`} company={company} price={price} />}
          </AnimatePresence>
        </div>

        {/* Footer Bar */}
        <footer className="h-10 border-t border-zinc-800 bg-zinc-950 px-10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3" />
              <span>LATENCY: 12ms</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span>REGION: US-EAST-1</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-zinc-600 uppercase">Project by arpit sharma | ipm 2</span>
            <div className="h-4 w-px bg-zinc-800" />
            <span>MARKET OPEN</span>
            <span className="text-zinc-400 uppercase">Valuation Terminal v1.0</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
