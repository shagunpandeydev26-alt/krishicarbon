import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { CorporateMarketplace } from './pages/CorporateMarketplace';
import { AdminDashboard } from './pages/AdminDashboard';
import { Intelligence } from './pages/Intelligence';
import { Architecture } from './pages/Architecture';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Moon, Sun } from 'lucide-react';

export default function App() {
  const [isDemoMode, setIsDemoMode] = React.useState(true);

  return (
    <Router>
      <div className="dark min-h-screen bg-bg-soft">
        <Layout>
          {/* Demo Mode Banner */}
          <AnimatePresence>
            {isDemoMode && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-primary text-slate-950 text-center py-2 text-xs font-bold flex items-center justify-center gap-2 overflow-hidden"
              >
                <Activity className="w-3 h-3 animate-pulse" />
                DEMO MODE ACTIVE: SIMULATING LIVE SATELLITE & BLOCKCHAIN DATA
                <button 
                  onClick={() => setIsDemoMode(false)}
                  className="ml-4 underline hover:text-slate-800"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/marketplace" element={<CorporateMarketplace />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/architecture" element={<Architecture />} />
          </Routes>

          {/* Floating Controls */}
          <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
            <div className="bg-slate-900/80 backdrop-blur-md shadow-xl rounded-full px-4 py-2 flex items-center gap-2 border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Demo</span>
              <button 
                onClick={() => setIsDemoMode(!isDemoMode)}
                className={`w-8 h-4 rounded-full relative transition-all ${isDemoMode ? 'bg-primary' : 'bg-slate-700'}`}
              >
                <motion.div 
                  animate={{ x: isDemoMode ? 16 : 2 }}
                  className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
          </div>
        </Layout>
      </div>
    </Router>
  );
}

