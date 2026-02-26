import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  TrendingUp, 
  Leaf, 
  Wallet, 
  ShieldCheck, 
  AlertCircle,
  ChevronRight,
  Upload,
  Cpu
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOCK_CHART_DATA = [
  { month: 'Jan', credits: 45 },
  { month: 'Feb', credits: 52 },
  { month: 'Mar', credits: 48 },
  { month: 'Apr', credits: 61 },
  { month: 'May', credits: 55 },
  { month: 'Jun', credits: 67 },
];

const LocationMarker = ({ setPosition }: { setPosition: (pos: [number, number]) => void }) => {
  const [pos, setPos] = React.useState<[number, number] | null>(null);
  useMapEvents({
    click(e) {
      setPos([e.latlng.lat, e.latlng.lng]);
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return pos === null ? null : (
    <Marker position={pos}>
      <Popup>Your Land Location</Popup>
    </Marker>
  );
};

interface StatCardProps {
  stat: {
    label: string;
    value: string;
    icon: React.ReactElement;
    color: string;
    bg: string;
  };
  index: number;
  key?: React.Key;
}

const StatCard = ({ stat, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card p-6 group"
  >
    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg", stat.bg, stat.color)}>
      {React.cloneElement(stat.icon, { className: "w-7 h-7" })}
    </div>
    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
    <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
  </motion.div>
);

export const FarmerDashboard = () => {
  const [landPos, setLandPos] = React.useState<[number, number]>([20.5937, 78.9629]);
  const [isMinting, setIsMinting] = React.useState(false);
  const [minted, setMinted] = React.useState(false);

  const stats = [
    { label: "Total Earnings", value: "$4,250", icon: <TrendingUp />, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Land Size", value: "12.5 Acres", icon: <MapPin />, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Credits Generated", value: "840 MT", icon: <Leaf />, color: "text-primary", bg: "bg-primary/10" },
    { label: "AI Confidence", value: "98.2%", icon: <ShieldCheck />, color: "text-primary", bg: "bg-primary/10" }
  ];

  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setMinted(true);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
      >
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Farmer Dashboard</h1>
          <p className="text-slate-400 text-lg">Welcome back, Rajesh Kumar. Your land is actively sequestering carbon.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(167,244,50,0.2)]">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Wallet Balance</p>
            <p className="text-lg font-bold text-white">1,240.50 MATIC</p>
          </div>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Land Registration & Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Map Section */}
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Land Registration
              </h3>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">Geo-tagged</span>
            </div>
            <div className="h-[400px] w-full relative">
              <MapContainer center={landPos} zoom={5} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setPosition={setLandPos} />
              </MapContainer>
              <div className="absolute bottom-4 left-4 z-[1000] glass-card p-3 text-xs shadow-lg">
                <p className="font-bold mb-1">Coordinates:</p>
                <p className="text-slate-600">{landPos[0].toFixed(4)}, {landPos[1].toFixed(4)}</p>
              </div>
            </div>
          </div>

          {/* Practice Form */}
          <div className="glass-card p-8">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              Sustainable Practices Report
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Crop Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Cotton</option>
                  <option>Sugarcane</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Irrigation Method</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                  <option>Drip Irrigation</option>
                  <option>Sprinkler</option>
                  <option>Flood Irrigation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tillage Method</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                  <option>No-Till</option>
                  <option>Reduced Till</option>
                  <option>Conventional</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Fertilizer Usage (kg/acre)</label>
                <input type="number" placeholder="45" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              </div>
            </div>
            <button className="btn-primary w-full mt-8 flex items-center justify-center gap-2">
              <Cpu className="w-5 h-5" />
              Run AI Carbon Estimation
            </button>
          </div>
        </div>

        {/* Right Column: AI Insights & Minting */}
        <div className="space-y-8">
          {/* AI Estimation UI */}
          <div className="glass-card p-6 bg-primary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Cpu className="w-24 h-24" />
            </div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              AI Carbon Projection
            </h3>
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-primary-foreground/60 text-xs font-bold uppercase tracking-wider">Estimated Sequestration</p>
                <p className="text-3xl font-display font-bold">124.5 MT CO₂e</p>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_CHART_DATA}>
                    <defs>
                      <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A7F432" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#A7F432" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="credits" stroke="#A7F432" fillOpacity={1} fill="url(#colorCredits)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <p className="text-[10px] font-bold opacity-60 uppercase">Income Projection</p>
                  <p className="font-bold">$1,860</p>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <p className="text-[10px] font-bold opacity-60 uppercase">Risk Score</p>
                  <p className="font-bold">Low (0.12)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Minting */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Blockchain Verification
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Status</span>
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", minted ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                  {minted ? "Minted" : "Pending Verification"}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your carbon credits are ready to be minted as ERC-721 tokens on the Polygon blockchain.
              </p>
            </div>

            {!minted ? (
              <button 
                onClick={handleMint}
                disabled={isMinting}
                className={cn(
                  "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                  isMinting ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"
                )}
              >
                {isMinting ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full"
                    />
                    Minting Token...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    Mint Carbon Token
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-bold">Successfully Minted!</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Transaction Hash</p>
                  <p className="text-[10px] font-mono text-slate-600 truncate">0x7a5b...f2e9c4d8a1b0c9e8d7f6a5b4c3d2e1f0</p>
                </div>
                <button className="w-full py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  View on Polygonscan
                </button>
              </div>
            )}
          </div>

          {/* AI Explanation */}
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-amber-900 mb-1">Why this estimate?</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                Our AI analyzed 24 satellite passes over your land. The increase in soil organic carbon is consistent with your reported "No-Till" practice and recent rainfall patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
