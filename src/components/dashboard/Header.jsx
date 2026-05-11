import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { userData } = useAuth();

  return (
    <header className="flex items-center justify-between p-6 mb-2">
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search quizzes, lessons..." 
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#0a0a0a]" />
        </button>
        
        <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{userData?.fullName || 'User'}</p>
            <p className="text-xs text-gray-500 capitalize">{userData?.role || 'Learner'}</p>
          </div>
          <div className="relative">
            <img 
              src={`https://ui-avatars.com/api/?name=${userData?.fullName || 'User'}&background=random`} 
              alt="Profile" 
              className="w-10 h-10 rounded-xl border-2 border-white/10 group-hover:border-primary transition-colors"
            />
          </div>
          <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors" />
        </Link>
      </div>
    </header>
  );
}
