import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  Globe, 
  BarChart3,
  Download,
  CheckCircle2,
  X
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
import { MOCK_CREDITS } from '../constants';
import { CarbonCredit } from '../types';

const ESG_COLORS = {
  'AAA': '#0B6E4F',
  'AA': '#1E9E74',
  'A': '#A7F432',
  'B': '#6B4226',
};

const CreditCard = ({ credit, onBuy }: { credit: CarbonCredit; onBuy: (c: CarbonCredit) => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="glass-card p-8 flex flex-col h-full group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20">
          {credit.type}
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-emerald-400/20">
          <ShieldCheck className="w-4 h-4" />
          {credit.verificationScore}% Verified
        </div>
      </div>

      <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors truncate">{credit.cooperative}</h3>
      <p className="text-sm text-slate-400 mb-6 flex items-center gap-2">
        <Globe className="w-4 h-4 text-slate-500" />
        {credit.region}, India
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Quantity</p>
          <p className="text-xl font-bold text-white">{credit.quantity} <span className="text-xs text-slate-500 font-normal">MT</span></p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">ESG Rating</p>
          <p className="text-xl font-bold" style={{ color: ESG_COLORS[credit.esgRating] }}>{credit.esgRating}</p>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Price / MT</p>
          <p className="text-3xl font-display font-bold text-primary">${credit.price}</p>
        </div>
        <button 
          onClick={() => onBuy(credit)}
          className="bg-primary text-slate-950 p-4 rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(167,244,50,0.3)] active:scale-90"
        >
          <ArrowUpRight className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
};

const PurchaseModal = ({ credit, onClose }: { credit: CarbonCredit; onClose: () => void }) => {
  const [step, setStep] = React.useState<'confirm' | 'processing' | 'success'>('confirm');

  const handlePurchase = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {step === 'confirm' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display font-bold text-white">Confirm Purchase</h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-white/5 p-4 rounded-2xl mb-6 border border-white/10">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Asset</span>
                <span className="font-bold text-white">{credit.cooperative} Credits</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Quantity</span>
                <span className="font-bold text-white">{credit.quantity} MT</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white font-bold">Total Price</span>
                <span className="text-primary font-bold text-xl">${(credit.quantity * credit.price).toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handlePurchase}
              className="btn-primary w-full py-4 text-lg"
            >
              Confirm & Pay with Wallet
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-12 text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full mx-auto mb-8"
            />
            <h3 className="text-2xl font-display font-bold mb-2 text-white">Processing Transaction</h3>
            <p className="text-slate-400">Securing your credits on the blockchain...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-emerald-400/10 text-emerald-400 rounded-full mx-auto mb-8 flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <h3 className="text-2xl font-display font-bold mb-2 text-white">Purchase Successful!</h3>
            <p className="text-slate-400 mb-8">Your carbon credits have been minted and added to your ESG portfolio.</p>
            <button 
              onClick={onClose}
              className="btn-primary w-full"
            >
              View Portfolio
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const CorporateMarketplace = () => {
  const [selectedCredit, setSelectedCredit] = React.useState<CarbonCredit | null>(null);
  const [filter, setFilter] = React.useState('All');

  const filteredCredits = filter === 'All' 
    ? MOCK_CREDITS 
    : MOCK_CREDITS.filter(c => c.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ESG Dashboard Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 glass-card p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-grow">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Corporate ESG Portfolio</h2>
            <p className="text-slate-500 mb-6">Tracking your journey towards Net Zero 2030.</p>
            <div className="flex gap-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-700 uppercase mb-1">Total Offset</p>
                <p className="text-2xl font-bold text-emerald-900">12,450 MT</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
                <p className="text-[10px] font-bold text-primary uppercase mb-1">ESG Rating</p>
                <p className="text-2xl font-bold text-primary">AAA</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Emissions', val: 4500 },
                { name: 'Offsets', val: 3200 }
              ]}>
                <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                  <Cell fill="#6B4226" />
                  <Cell fill="#0B6E4F" />
                </Bar>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 bg-slate-900 text-white flex flex-col justify-between">
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              Compliance Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">BRSR Reporting</span>
                <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">Ready</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Audit Trail</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">Verified</span>
              </div>
            </div>
          </div>
          <button className="mt-8 flex items-center justify-center gap-2 w-full py-3 border border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
            <Download className="w-4 h-4" />
            Download ESG Report
          </button>
        </div>
      </div>

      {/* Marketplace Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search cooperatives, regions..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none shadow-sm text-white"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
          {['All', 'Soil', 'Forestry', 'Methane'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === t 
                  ? 'bg-primary text-slate-950 shadow-md' 
                  : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Credit Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCredits.map((credit) => (
            <div key={credit.id}>
              <CreditCard 
                credit={credit} 
                onBuy={(c) => setSelectedCredit(c)} 
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Purchase Modal */}
      {selectedCredit && (
        <PurchaseModal 
          credit={selectedCredit} 
          onClose={() => setSelectedCredit(null)} 
        />
      )}
    </div>
  );
};
