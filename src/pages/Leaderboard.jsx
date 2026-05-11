import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { Trophy, Medal, Star, Target } from 'lucide-react';

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(20));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTopUsers(users);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background flex p-4 gap-4 overflow-hidden font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
        <Header />
        
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="bg-yellow-400/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="text-yellow-400" size={40} />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Global Leaderboard</h1>
              <p className="text-gray-400">The world's top JavaScript masters</p>
            </motion.div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center p-20">
                  <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              ) : (
                topUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card p-4 flex items-center gap-6 ${index < 3 ? 'border-primary/30 bg-primary/5' : ''}`}
                  >
                    <div className="w-12 text-center font-bold text-2xl text-gray-500">
                      {index === 0 ? <Medal className="text-yellow-400 mx-auto" size={32} /> : 
                       index === 1 ? <Medal className="text-gray-300 mx-auto" size={32} /> :
                       index === 2 ? <Medal className="text-orange-400 mx-auto" size={32} /> :
                       `#${index + 1}`}
                    </div>
                    
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`} 
                      alt={user.fullName}
                      className="w-12 h-12 rounded-xl border border-white/10"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">{user.fullName}</h3>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{user.role || 'Learner'}</p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">XP Points</p>
                        <div className="flex items-center gap-2 text-primary font-bold text-xl">
                          <Star size={18} />
                          {user.xp || 0}
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Streak</p>
                        <div className="flex items-center gap-2 text-orange-400 font-bold text-xl">
                          <Target size={18} />
                          {user.streak || 0}d
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
