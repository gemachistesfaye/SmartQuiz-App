import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function StatCards() {
  const { userData } = useAuth();

  const stats = [
    { label: 'Total XP', value: userData?.xp || 0, icon: <Trophy />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Avg. Quiz Score', value: '88%', icon: <Target />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Current Streak', value: `${userData?.streak || 0} Days`, icon: <Zap />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Learning Time', value: '4.5h', icon: <Clock />, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-6 border-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              {React.cloneElement(stat.icon, { size: 24 })}
            </div>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
          <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}
