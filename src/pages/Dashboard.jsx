import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import StatCards from '../components/dashboard/StatCards';
import ProgressChart from '../components/dashboard/ProgressChart';
import WeakTopics from '../components/dashboard/WeakTopics';
import RecentActivity from '../components/dashboard/RecentActivity';
import LeaderboardPreview from '../components/dashboard/LeaderboardPreview';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex p-4 gap-4 overflow-hidden">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar pr-2">
        <Header />
        
        <main className="flex-1 py-2">
          {/* Statistics Section */}
          <StatCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">
            {/* Chart - Spans 2 columns */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ProgressChart />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WeakTopics />
                <LeaderboardPreview />
              </div>
            </div>

            {/* Sidebar content - Spans 1 column */}
            <div className="flex flex-col gap-6">
              <RecentActivity />
              
              {/* Daily Streak Card */}
              <div className="glass-card p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/20">
                <h3 className="text-lg font-bold text-white mb-4">Daily Streak</h3>
                <div className="flex justify-between items-center mb-6">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        i < 4 ? 'bg-primary text-white' : 'bg-white/5 text-gray-500'
                      }`}>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  You're on a <span className="text-primary font-bold">4-day streak!</span> Keep it up to reach your weekly goal.
                </p>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[60%]" />
                </div>
              </div>

              {/* Pro Upgrade Card */}
              <div className="glass-card p-6 border-secondary/30 relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/20 blur-3xl" />
                <h3 className="text-lg font-bold text-white mb-2">Upgrade to Pro</h3>
                <p className="text-sm text-gray-400 mb-4">Get unlimited access to advanced tracks and AI tutoring.</p>
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                  Go Premium
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
