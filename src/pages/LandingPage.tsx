import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Leaf, ArrowRight, ShieldCheck, Globe, Database, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_STATS } from '../constants';

const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-display font-bold text-4xl text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-slate-950/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
          alt="Farmland" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: -500,
              x: Math.random() * 200 - 100
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            className="absolute w-1.5 h-1.5 bg-primary/30 rounded-full blur-[1px]"
            style={{ 
              left: `${Math.random() * 100}%`,
              bottom: '-10%'
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-8 border border-primary/20 backdrop-blur-md">
            <Leaf className="w-4 h-4" />
            <span>National Scale Digital Infrastructure</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 leading-[1] tracking-tight">
            Empowering 100 Million Farmers with <span className="text-primary drop-shadow-[0_0_15px_rgba(167,244,50,0.5)]">Climate Income</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            AI-powered satellite carbon verification + blockchain-backed trading. Turn sustainable farming into verified income.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/farmer-dashboard" className="btn-primary flex items-center gap-2 w-full sm:w-auto text-lg px-8 py-4">
              Register as Farmer
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/marketplace" className="btn-accent flex items-center gap-2 w-full sm:w-auto text-lg px-8 py-4 backdrop-blur-md">
              Buy Carbon Credits
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/4 right-10 hidden lg:block glass-card p-6 max-w-[240px] z-30"
      >
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="text-primary w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified</span>
        </div>
        <p className="text-sm font-medium text-slate-200">AI-Satellite Analysis Complete</p>
        <div className="mt-3 h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '98%' }}
            transition={{ duration: 2, delay: 1 }}
            className="h-full bg-primary shadow-[0_0_10px_#A7F432]" 
          />
        </div>
      </motion.div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="py-24 bg-slate-950 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="text-center">
          <CountUp value={MOCK_STATS.farmers} />
          <p className="text-slate-400 font-medium mt-2">Farmers Onboarded</p>
        </div>
        <div className="text-center">
          <CountUp value={MOCK_STATS.credits} />
          <p className="text-slate-400 font-medium mt-2">Carbon Credits Generated</p>
        </div>
        <div className="text-center">
          <CountUp value={MOCK_STATS.co2Offset} suffix=" Tons" />
          <p className="text-slate-400 font-medium mt-2">CO₂ Offset</p>
        </div>
        <div className="text-center">
          <CountUp value={MOCK_STATS.incomeDistributed} suffix=" $" />
          <p className="text-slate-400 font-medium mt-2">Total Income Distributed</p>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Farmer Registers Land",
      desc: "Geo-tagging and digital KYC for 100% ownership verification."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "AI Satellite Analysis",
      desc: "Multi-spectral imaging tracks soil health and carbon sequestration."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Carbon Credits Estimated",
      desc: "Real-time estimation based on farming practices and weather data."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Blockchain Minting",
      desc: "Credits minted as verified tokens on the Polygon network."
    }
  ];

  return (
    <section className="py-32 bg-bg-soft px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Interactive Flow</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">A transparent, end-to-end digital infrastructure for climate action.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-10 relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-primary text-slate-950 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(167,244,50,0.3)] group-hover:shadow-[0_0_30px_rgba(167,244,50,0.5)] transition-all">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-slate-950 rounded-full flex items-center justify-center font-bold border-4 border-bg-soft shadow-lg">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            A Multi-Dimensional <span className="text-primary">Ecosystem</span>
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Scaling climate impact through integrated technology and community-driven verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 glass-card p-10 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Satellite Intelligence</h3>
              <p className="text-slate-300 max-w-md">Real-time multi-spectral monitoring of 100M+ hectares of farmland using neural network analysis.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 flex flex-col justify-center border-primary/20 bg-primary/5"
          >
            <TrendingUp className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Market Liquidity</h3>
            <p className="text-slate-400 text-sm">Instant settlement for farmers via automated market makers on Polygon.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 flex flex-col justify-center border-accent/20"
          >
            <ShieldCheck className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Immutable Trust</h3>
            <p className="text-slate-400 text-sm">Every carbon credit is a unique NFT with full provenance and audit trails.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 glass-card p-8 flex flex-col justify-center bg-slate-900/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-400">124K+ Farmers</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
            <p className="text-slate-400 text-sm">Local cooperatives verify ground truth data alongside AI analysis.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  return (
    <section className="py-20 bg-slate-950/50 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-12">Trusted by Global Leaders</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="font-display font-bold text-2xl text-white">WORLD BANK</div>
          <div className="font-display font-bold text-2xl text-white">POLYGON</div>
          <div className="font-display font-bold text-2xl text-white">GOOGLE CLOUD</div>
          <div className="font-display font-bold text-2xl text-white">RELIANCE</div>
          <div className="font-display font-bold text-2xl text-white">TATA AGRO</div>
        </div>
      </div>
    </section>
  );
};

export const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-bg-soft overflow-hidden">
      <Hero />
      <Partners />
      <Stats />
      <BentoGrid />
      <HowItWorks />
      
      {/* Trust Section with Parallax Image */}
      <section className="py-32 bg-slate-950 px-4 relative">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 opacity-10 pointer-events-none"
        >
          <img 
            src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=2000" 
            alt="Soil" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Built on Trust & Transparency</h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              We combine government-grade compliance with cutting-edge Web3 technology to ensure every carbon credit is real, unique, and impactful.
            </p>
            
            <div className="space-y-8">
              {[
                { title: "Blockchain Secured", desc: "Immutable audit logs for every transaction." },
                { title: "Government Compliant", desc: "Aligned with national climate goals and regulations." },
                { title: "Transparent Marketplace", desc: "Real-time pricing and verification scores for buyers." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center mt-1 group-hover:bg-primary/20 transition-all">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden shadow-2xl rotate-3 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800" 
                alt="Sustainable Farming" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-8 shadow-2xl max-w-[280px] -rotate-3 border border-primary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="text-primary w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Impact Score</p>
                  <p className="text-2xl font-bold text-primary">98.4/100</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Verified by AI-Satellite Neural Engine with 99.2% confidence.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
