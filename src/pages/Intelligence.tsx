import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Brain, 
  ShieldCheck, 
  TrendingUp, 
  Search, 
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AIModule = ({ icon, title, desc, features }: { icon: React.ReactNode; title: string; desc: string; features: string[] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card p-8 border-primary/10 hover:border-primary/30 transition-all"
    >
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed">{desc}</p>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export const Intelligence = () => {
  const [showXAI, setShowXAI] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Neural Network Background Animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_#A7F432]"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        <svg className="w-full h-full">
          <motion.path
            d="M 100 100 L 300 300 L 500 100"
            stroke="#A7F432"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-accent/20">
              <Brain className="w-4 h-4" />
              <span>KrishiCarbon Intelligence Engine</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">The Brain of <span className="text-accent">Climate Action</span></h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Our proprietary AI stack combines satellite telemetry, weather patterns, and soil physics to verify carbon sequestration with 98%+ accuracy.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AIModule 
            icon={<TrendingUp className="w-8 h-8" />}
            title="Carbon Yield Prediction"
            desc="Predicts future carbon sequestration potential based on historical land data and proposed farming practices."
            features={["Multi-spectral Analysis", "Soil Organic Carbon Modeling", "Practice-based Projections"]}
          />
          <AIModule 
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Climate Risk Modeling"
            desc="Assesses environmental risks like floods, droughts, and pests that could impact carbon permanence."
            features={["Weather Anomaly Detection", "Historical Trend Analysis", "Permanence Scoring"]}
          />
          <AIModule 
            icon={<Search className="w-8 h-8" />}
            title="Fraud Detection AI"
            desc="Identifies suspicious land claims and practice reporting using cross-referenced satellite and ground data."
            features={["Geo-spatial Verification", "Practice Consistency Checks", "Anomaly Alerting"]}
          />
        </div>

        <div className="mt-24 bg-white/5 border border-white/10 rounded-3xl p-12 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-grow">
            <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
              <Zap className="text-accent w-8 h-8" />
              Explainable AI (XAI)
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We don't just provide estimates; we provide reasons. Our XAI module breaks down every carbon credit calculation into human-readable factors, ensuring trust for both farmers and buyers.
            </p>
            <button 
              onClick={() => setShowXAI(true)}
              className="bg-accent text-primary px-8 py-4 rounded-xl font-bold hover:bg-accent/90 transition-all flex items-center gap-2"
            >
              See XAI in Action
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full lg:w-1/2 aspect-video bg-slate-900 rounded-2xl border border-white/10 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-slate-500 uppercase">Analysis Node #842</span>
                <span className="text-xs font-bold text-accent">Confidence: 99.2%</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-accent" />
                </div>
                <p className="text-[10px] text-slate-500">Satellite Vegetation Index (NDVI) Correlation</p>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-accent" />
                </div>
                <p className="text-[10px] text-slate-500">Soil Moisture Consistency (SAR Data)</p>
              </div>
              <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-xs text-accent leading-relaxed">
                  "The 12% increase in carbon is attributed to the adoption of cover cropping, verified by NIR spectral signatures detected on Feb 12th."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* XAI Modal */}
      {showXAI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-display font-bold flex items-center gap-2">
                <Info className="text-accent w-6 h-6" />
                Explainable AI Module
              </h3>
              <button onClick={() => setShowXAI(false)} className="text-slate-400 hover:text-white">
                Close
              </button>
            </div>
            <div className="space-y-6">
              <p className="text-slate-400">
                Our XAI system uses SHAP (SHapley Additive exPlanations) values to show how each input feature contributed to the final carbon estimate.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Crop Residue Management", impact: "+4.2 MT", color: "text-accent" },
                  { label: "Reduced Tillage", impact: "+2.8 MT", color: "text-accent" },
                  { label: "Soil Temperature Anomaly", impact: "-0.5 MT", color: "text-rose-400" },
                  { label: "Rainfall Pattern Match", impact: "+1.2 MT", color: "text-accent" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className={cn("font-bold", item.color)}>{item.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
