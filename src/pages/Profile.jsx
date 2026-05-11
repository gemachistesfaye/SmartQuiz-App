import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { User, Mail, Shield, Camera, Award, Zap, Trophy, Save } from 'lucide-react';

export default function Profile() {
  const { userData, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || '',
    username: userData?.username || '',
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        fullName: formData.fullName,
        username: formData.username,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-0 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Avatar & Stats */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 text-center"
              >
                <div className="relative inline-block mb-6">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${userData?.fullName || 'User'}&size=128&background=random`} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-3xl border-4 border-white/5"
                  />
                  <button className="absolute -bottom-2 -right-2 bg-primary p-2.5 rounded-xl shadow-lg hover:bg-primary/90 transition-all">
                    <Camera size={20} className="text-white" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{userData?.fullName}</h2>
                <p className="text-gray-500 mb-6 font-medium">@{userData?.username}</p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {userData?.role || 'Learner'}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 grid grid-cols-2 gap-4"
              >
                <div className="text-center p-4 rounded-2xl bg-white/5">
                  <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
                  <p className="text-xs text-gray-500 uppercase font-bold">XP</p>
                  <p className="text-xl font-bold text-white">{userData?.xp || 0}</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5">
                  <Zap className="text-orange-400 mx-auto mb-2" size={24} />
                  <p className="text-xs text-gray-500 uppercase font-bold">Streak</p>
                  <p className="text-xl font-bold text-white">{userData?.streak || 0}d</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Edit Profile */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <User className="text-primary" size={24} />
                  <h3 className="text-xl font-bold text-white">Account Settings</h3>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-500 uppercase ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-500 uppercase ml-1">Username</label>
                      <input 
                        type="text" 
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                      <input 
                        type="email" 
                        disabled
                        value={currentUser?.email}
                        className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button 
                      disabled={loading}
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={20} /> Save Changes</>}
                    </button>
                  </div>
                </form>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 border-red-500/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="text-red-400" size={24} />
                  <h3 className="text-xl font-bold text-white">Security & Admin</h3>
                </div>
                <p className="text-gray-400 text-sm mb-6">You can reset your password or activate Admin privileges using a secret code.</p>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all">
                      Reset Password
                    </button>
                    {!userData?.role || userData.role !== 'admin' ? (
                      <div className="flex gap-2 flex-1 max-w-xs">
                        <input 
                          type="password" 
                          id="adminCode"
                          placeholder="Admin Code"
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 flex-1"
                        />
                        <button 
                          onClick={async () => {
                            const code = document.getElementById('adminCode').value;
                            const success = await makeAdmin(code);
                            if (success) {
                              toast.success("You are now an Admin!");
                              window.location.reload();
                            } else {
                              toast.error("Invalid Code");
                            }
                          }}
                          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                        >
                          Activate
                        </button>
                      </div>
                    ) : (
                      <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                        <Shield size={16} /> Admin Mode Active
                      </div>
                    )}
                  </div>
                  
                  <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2.5 rounded-xl text-sm font-bold transition-all">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
