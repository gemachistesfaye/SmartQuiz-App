import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Users, Search, Filter, ShieldCheck, Mail, MoreHorizontal } from 'lucide-react';

const users = [
  { name: 'Alex Johnson', email: 'alex@example.com', role: 'Student', status: 'Active', xp: 2400 },
  { name: 'Sarah Miller', email: 'sarah@example.com', role: 'Student', status: 'Active', xp: 5100 },
  { name: 'Admin Master', email: 'admin@smartquiz.com', role: 'Admin', status: 'Active', xp: 9999 },
  { name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Inactive', xp: 120 },
];

export default function UserManagement() {
  return (
    <DashboardLayout>
      <div className="px-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-400">Manage platform users and roles.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" placeholder="Search users..." className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none" />
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${u.name}&background=random`} className="w-8 h-8 rounded-lg" alt="" />
                      <div>
                        <p className="text-sm font-bold text-white">{u.name}</p>
                        <p className="text-[10px] text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.role === 'Admin' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-300">{u.xp} XP</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
