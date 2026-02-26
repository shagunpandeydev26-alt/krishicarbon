import React from 'react';
import { Leaf, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-primary p-1.5 rounded-lg">
              <Leaf className="text-accent w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl text-white tracking-tight">
              KrishiCarbon
            </span>
          </div>
          <p className="max-w-md mb-8 leading-relaxed">
            Empowering 100 million farmers with climate income through AI-powered satellite carbon verification and blockchain-backed trading.
          </p>
          <div className="flex gap-4">
            <Twitter className="w-5 h-5 cursor-pointer hover:text-accent transition-colors" />
            <Github className="w-5 h-5 cursor-pointer hover:text-accent transition-colors" />
            <Linkedin className="w-5 h-5 cursor-pointer hover:text-accent transition-colors" />
            <Mail className="w-5 h-5 cursor-pointer hover:text-accent transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Platform</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Farmer Portal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Corporate ESG</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Government Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resources</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Impact Reports</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm">
        <p>© 2026 KrishiCarbon Exchange. All rights reserved. Built for a sustainable future.</p>
      </div>
    </footer>
  );
};
