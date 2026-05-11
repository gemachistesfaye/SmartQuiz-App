import React from 'react';
import StudentSidebar from '../components/dashboard/StudentSidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Header from '../components/dashboard/Header';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children }) {
  const { userData, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-background flex p-4 gap-4 overflow-hidden font-sans">
      {isAdmin ? <AdminSidebar /> : <StudentSidebar />}
      
      <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar relative">
        <Header />
        <main className="flex-1 p-2 md:p-6 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
}
