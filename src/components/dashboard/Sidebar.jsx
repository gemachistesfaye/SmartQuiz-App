import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Settings, 
  LogOut, 
  Brain,
  MessageSquare,
  Users,
  ShieldAlert
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <BookOpen size={20} />, label: 'My Quizzes', path: '/quiz' },
  { icon: <Trophy size={20} />, label: 'Leaderboard', path: '/leaderboard' },
  { icon: <Users size={20} />, label: 'Community', path: '/community' },
  { icon: <MessageSquare size={20} />, label: 'Messages', path: '/messages' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate('/login');
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <aside className="w-64 glass-card h-[calc(100vh-2rem)] sticky top-4 left-4 flex flex-col p-6 hidden lg:flex">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">Smart<span className="text-gradient">Quiz</span></span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}

        {isAdmin && (
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === '/admin' 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'text-red-400 hover:text-white hover:bg-red-400/10'
            }`}
          >
            <ShieldAlert size={20} />
            <span className="font-medium">Admin Panel</span>
          </Link>
        )}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
