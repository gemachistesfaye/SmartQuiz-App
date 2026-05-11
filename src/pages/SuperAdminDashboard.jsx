import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  Users, 
  Database, 
  BarChart3, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  UserPlus,
  BookOpen
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const userGrowth = [
  { name: 'Mon', active: 400, total: 2400 },
  { name: 'Tue', active: 300, total: 2500 },
  { name: 'Wed', active: 500, total: 2700 },
  { name: 'Thu', active: 800, total: 3200 },
  { name: 'Fri', active: 600, total: 3400 },
  { name: 'Sat', active: 900, total: 3900 },
  { name: 'Sun', active: 1100, total: 4500 },
];

const quizStats = [
  { topic: 'Functions', completions: 120, failRate: 20 },
  { topic: 'Async JS', completions: 85, failRate: 45 },
  { topic: 'Arrays', completions: 210, failRate: 15 },
  { topic: 'Security', completions: 65, failRate: 35 },
  { topic: 'ES6+', completions: 150, failRate: 10 },
];

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 px-6">
        {/* Admin Welcome */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Platform Console</h1>
            <p className="text-gray-400">Monitoring global activity and system health.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
              <AlertCircle size={18} /> System Alert
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
              Export CSV
            </button>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: '4,521', growth: '+12%', icon: <Users className="text-blue-400" /> },
            { label: 'Active Today', value: '1,102', growth: '+25%', icon: <Activity className="text-green-400" /> },
            { label: 'Total Quizzes', value: '12,845', growth: '+8%', icon: <BookOpen className="text-purple-400" /> },
            { label: 'Database Health', value: '99.9%', growth: 'Stable', icon: <Database className="text-yellow-400" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">{stat.icon}</div>
                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                  <ArrowUpRight size={14} /> {stat.growth}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-3xl font-bold text-white mt-1">{stat.value}</h4>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="glass-card p-8 min-h-[400px]">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-400" /> User Growth Trends
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowth}>
                  <defs>
                    <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAdmin)" />
                  <Area type="monotone" dataKey="active" stroke="#10b981" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <BarChart3 size={20} className="text-purple-400" /> Question Difficulty Analytics
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quizStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="topic" stroke="#6b7280" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                  <Bar dataKey="completions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="failRate" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Security Log Section */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-green-400" size={24} /> Recent Security Logs
            </h3>
            <button className="text-sm text-primary font-bold hover:underline">View All Logs</button>
          </div>
          <div className="space-y-4">
            {[
              { event: 'Database Backup', time: '10 mins ago', status: 'Success', icon: <Database size={16} /> },
              { event: 'Suspicious Login Attempt', time: '45 mins ago', status: 'Blocked', icon: <AlertCircle size={16} className="text-red-400" /> },
              { event: 'New Admin Promoted', time: '2 hours ago', status: 'Verified', icon: <UserPlus size={16} /> },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-400">{log.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-white">{log.event}</p>
                    <p className="text-xs text-gray-500">{log.time}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  log.status === 'Success' ? 'bg-green-500/20 text-green-500' : 
                  log.status === 'Blocked' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                }`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
