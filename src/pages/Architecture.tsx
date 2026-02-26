import React from 'react';
import { motion } from 'motion/react';
import { 
  Server, 
  Database, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Layers,
  ArrowRight,
  Cloud,
  Lock,
  Zap
} from 'lucide-react';

const Node = ({ icon, title, x, y, color = "bg-primary" }: { icon: React.ReactNode; title: string; x: string; y: string; color?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={clsx("absolute z-10 flex flex-col items-center gap-2", x, y)}
    >
      <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl", color)}>
        {icon}
      </div>
      <span className="text-xs font-bold text-slate-700 whitespace-nowrap bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
        {title}
      </span>
    </motion.div>
  );
};

const Connection = ({ from, to, delay = 0 }: { from: { x: number, y: number }, to: { x: number, y: number }, delay?: number }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <motion.line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke="#0B6E4F"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.circle
        r="4"
        fill="#A7F432"
        initial={{ offset: 0 }}
        animate={{ 
          cx: [`${from.x}%`, `${to.x}%`],
          cy: [`${from.y}%`, `${to.y}%`],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2, delay, repeat: Infinity }}
      />
    </svg>
  );
};

import { clsx } from 'clsx';

export const Architecture = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-display font-bold text-slate-900 mb-6">System Architecture</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          A highly scalable, modular infrastructure designed to handle 100M+ farmers and billions of data points.
        </p>
      </div>

      {/* Architecture Visualization */}
      <div className="relative h-[600px] bg-slate-50 rounded-[3rem] border border-slate-200 overflow-hidden mb-24">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Nodes */}
        <Node icon={<Globe />} title="Farmer Web App" x="left-[10%]" y="top-[40%]" />
        <Node icon={<Cloud />} title="API Gateway" x="left-[30%]" y="top-[40%]" color="bg-slate-800" />
        
        <Node icon={<Cpu />} title="Carbon Engine" x="left-[55%]" y="top-[20%]" color="bg-primary" />
        <Node icon={<Database />} title="Satellite Service" x="left-[55%]" y="top-[40%]" color="bg-primary" />
        <Node icon={<ShieldCheck />} title="Blockchain Service" x="left-[55%]" y="top-[60%]" color="bg-primary" />
        
        <Node icon={<Layers />} title="Marketplace API" x="left-[80%]" y="top-[30%]" color="bg-slate-800" />
        <Node icon={<Server />} title="Analytics Engine" x="left-[80%]" y="top-[50%]" color="bg-slate-800" />

        {/* Connections */}
        <Connection from={{ x: 15, y: 45 }} to={{ x: 30, y: 45 }} />
        
        <Connection from={{ x: 35, y: 45 }} to={{ x: 55, y: 25 }} delay={0.5} />
        <Connection from={{ x: 35, y: 45 }} to={{ x: 55, y: 45 }} delay={0.7} />
        <Connection from={{ x: 35, y: 45 }} to={{ x: 55, y: 65 }} delay={0.9} />
        
        <Connection from={{ x: 60, y: 25 }} to={{ x: 80, y: 35 }} delay={1.2} />
        <Connection from={{ x: 60, y: 45 }} to={{ x: 80, y: 55 }} delay={1.4} />
        <Connection from={{ x: 60, y: 65 }} to={{ x: 80, y: 35 }} delay={1.6} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            title: "Scalable Microservices", 
            desc: "Each core function is isolated as a microservice, allowing independent scaling and high availability.",
            icon: <Server className="text-primary" />
          },
          { 
            title: "Edge-Ready API", 
            desc: "Optimized for low-bandwidth rural areas with offline-first capabilities and edge caching.",
            icon: <Zap className="text-primary" />
          },
          { 
            title: "On-Chain Audit Log", 
            desc: "Every carbon credit lifecycle event is recorded on-chain for 100% transparency and auditability.",
            icon: <Lock className="text-primary" />
          }
        ].map((item, i) => (
          <div key={i} className="glass-card p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
