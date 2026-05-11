import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { userData, isAdmin } = useAuth();

  return (
    <header className="flex items-center justify-between p-6 mb-2">
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder={isAdmin ? "Search users, system logs..." : "Search quizzes, lessons..."} 
          className={`w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-colors ${
            isAdmin ? 'focus:border-red-500/50' : 'focus:border-primary/50'
          }`}
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className={`absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-[#0a0a0a] ${
            isAdmin ? 'bg-red-500' : 'bg-primary'
          }`} />
        </button>
        
        <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none mb-1">{userData?.fullName || 'User'}</p>
            <div className="flex items-center justify-end gap-2">
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                isAdmin ? 'bg-red-500/20 text-red-400' : 'bg-primary/20 text-primary'
              }`}>
                {userData?.role || 'Learner'}
              </span>
              <p className="text-[10px] text-gray-500 font-medium">Lvl {Math.floor((userData?.xp || 0) / 1000) + 1}</p>
            </div>
          </div>
          <div className="relative">
            <img 
              src={`https://ui-avatars.com/api/?name=${userData?.fullName || 'User'}&background=random`} 
              alt="Profile" 
              className={`w-10 h-10 rounded-xl border-2 transition-colors ${
                isAdmin ? 'border-red-500/20 group-hover:border-red-500' : 'border-white/10 group-hover:border-primary'
              }`}
            />
          </div>
          <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors" />
        </Link>
      </div>
    </header>
  );
}
