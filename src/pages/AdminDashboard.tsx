import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  Leaf, 
  AlertTriangle,
  CheckCircle2,
  Search,
  ArrowUpRight,
  Activity,
  Map as MapIcon
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOCK_HEATMAP_DATA = [
  { name: 'Maharashtra', lat: 19.7515, lng: 75.7139, credits: 120000, risk: 'Low' },
  { name: 'Punjab', lat: 31.1471, lng: 75.3412, credits: 85000, risk: 'Medium' },
  { name: 'Kerala', lat: 10.8505, lng: 76.2711, credits: 45000, risk: 'Low' },
  { name: 'Bihar', lat: 25.0961, lng: 85.3131, credits: 62000, risk: 'High' },
  { name: 'Gujarat', lat: 22.2587, lng: 71.1924, credits: 95000, risk: 'Low' },
];

const MOCK_ALERTS = [
  { id: 1, type: 'Fraud', message: 'Suspicious land claim in Vidarbha region', severity: 'High', time: '2m ago' },
  { id: 2, type: 'Anomaly', message: 'Unusual carbon sequestration spike in Punjab', severity: 'Medium', time: '15m ago' },
  { id: 3, type: 'System', message: 'Satellite data sync delayed for Sector 7', severity: 'Low', time: '1h ago' },
];

const IMPACT_DATA = [
  { name: 'Jan', income: 4000, carbon: 2400 },
  { name: 'Feb', income: 3000, carbon: 1398 },
  { name: 'Mar', income: 2000, carbon: 9800 },
  { name: 'Apr', income: 2780, carbon: 3908 },
  { name: 'May', income: 1890, carbon: 4800 },
  { name: 'Jun', income: 2390, carbon: 3800 },
];

export const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">National Admin Command Center</h1>
          <p className="text-slate-500">Monitoring 124,500 farmers across 22 states.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-400/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-400/20">
          <Activity className="w-4 h-4" />
          System Status: Optimal
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Farmers", value: "124,500", icon: <Users />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Carbon Offset", value: "4.2M Tons", icon: <Leaf />, color: "text-primary", bg: "bg-primary/10" },
          { label: "Rural Income Uplift", value: "+24.5%", icon: <TrendingUp />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Alerts", value: "12", icon: <ShieldAlert />, color: "text-rose-600", bg: "bg-rose-50" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
              {stat.icon}
            </div>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* National Heatmap */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-primary" />
                National Carbon Heatmap
              </h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-primary" /> High Yield
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-amber-400" /> Medium
                </span>
              </div>
            </div>
            <div className="h-[500px] w-full">
              <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {MOCK_HEATMAP_DATA.map((point, i) => (
                  <CircleMarker 
                    key={i}
                    center={[point.lat, point.lng]}
                    radius={point.credits / 10000}
                    pathOptions={{ 
                      fillColor: point.risk === 'High' ? '#e11d48' : '#0B6E4F', 
                      color: 'white', 
                      weight: 2, 
                      fillOpacity: 0.6 
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <p className="font-bold text-slate-900">{point.name}</p>
                        <p className="text-xs text-slate-600">{point.credits.toLocaleString()} MT Credits</p>
                        <p className={cn("text-[10px] font-bold mt-1 uppercase", point.risk === 'High' ? 'text-rose-600' : 'text-emerald-600')}>
                          Risk: {point.risk}
                        </p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Impact Metrics Chart */}
          <div className="glass-card p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-900">Impact Growth Metrics</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-xs font-bold outline-none">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={IMPACT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="income" stroke="#0B6E4F" strokeWidth={3} dot={{ r: 4, fill: '#0B6E4F' }} />
                  <Line type="monotone" dataKey="carbon" stroke="#A7F432" strokeWidth={3} dot={{ r: 4, fill: '#A7F432' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Alerts & Fraud Detection */}
        <div className="space-y-8">
          {/* Fraud Detection Panel */}
          <div className="glass-card p-6 border-rose-100 bg-rose-50/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                AI Fraud Detection
              </h3>
              <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded-full">3 Active</span>
            </div>
            
            <div className="space-y-4">
              {MOCK_ALERTS.map((alert) => (
                <div key={alert.id} className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                      alert.severity === 'High' ? 'bg-rose-100 text-rose-700' : 
                      alert.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    )}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 mb-1">{alert.type}</p>
                  <p className="text-xs text-slate-600 mb-3">{alert.message}</p>
                  <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                    Investigate <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 bg-white border border-rose-200 rounded-xl text-sm font-bold text-rose-700 hover:bg-rose-50 transition-all">
              View All Alerts
            </button>
          </div>

          {/* Real-time Impact Feed */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Live Impact Feed
            </h3>
            <div className="space-y-6">
              {[
                { user: "Farmer Rajesh", action: "Minted 12 MT Credits", location: "Maharashtra", time: "Just now" },
                { user: "Reliance ESG", action: "Purchased 500 MT Credits", location: "Corporate", time: "5m ago" },
                { user: "Farmer Priya", action: "Registered 5.2 Acres", location: "Punjab", time: "12m ago" },
                { user: "Adani Green", action: "Retired 1,200 MT Credits", location: "Corporate", time: "24m ago" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 3 && <div className="absolute left-2.5 top-6 bottom-[-1.5rem] w-0.5 bg-slate-100" />}
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 z-10">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-slate-900">{item.user}</p>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-600">{item.action}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Pie Chart */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-slate-900 mb-6">Credit Type Distribution</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Soil', value: 45 },
                      { name: 'Forestry', value: 30 },
                      { name: 'Methane', value: 25 },
                    ]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#0B6E4F" />
                    <Cell fill="#A7F432" />
                    <Cell fill="#6B4226" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center">
                <div className="w-2 h-2 rounded-full bg-primary mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-600">Soil</p>
              </div>
              <div className="text-center">
                <div className="w-2 h-2 rounded-full bg-accent mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-600">Forest</p>
              </div>
              <div className="text-center">
                <div className="w-2 h-2 rounded-full bg-secondary mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-600">Methane</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
