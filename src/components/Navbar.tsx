import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Wallet, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { NAV_LINKS } from '../constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollYProgress }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50 shadow-[0_0_10px_#A7F432]"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg shadow-[0_0_15px_rgba(167,244,50,0.4)] group-hover:scale-110 transition-transform">
              <Leaf className="text-slate-950 w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl text-white tracking-tight">
              KrishiCarbon
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="flex items-center gap-2 bg-primary text-slate-950 px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(167,244,50,0.4)] transition-all active:scale-95">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-slate-900 border-b border-white/10 px-4 py-6 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300"
              >
                {link.name}
              </Link>
            ))}
            <button className="flex items-center justify-center gap-2 bg-primary text-slate-950 px-4 py-3 rounded-xl font-bold">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
