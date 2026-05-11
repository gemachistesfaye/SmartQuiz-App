import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import QuizPage from './pages/QuizPage';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import AdminPanel from './pages/AdminPanel';
import CodeLab from './pages/CodeLab';
import AIAssistant from './pages/AIAssistant';
import TheoryVault from './pages/TheoryVault';
import Cybersecurity from './pages/Cybersecurity';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ForgotPassword from './auth/ForgotPassword';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardSwitch() {
  const { isAdmin } = useAuth();
  return isAdmin ? <SuperAdminDashboard /> : <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <ToastContainer theme="dark" position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardSwitch />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quiz" 
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/codelab" 
          element={
            <ProtectedRoute>
              <CodeLab />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ai-assistant" 
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/theory" 
          element={
            <ProtectedRoute>
              <TheoryVault />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cybersecurity" 
          element={
            <ProtectedRoute>
              <Cybersecurity />
            </ProtectedRoute>
          } 
        />
        <Route path="/messages" element={<ProtectedRoute><div className="p-10 text-white">Messages coming soon...</div></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><div className="p-10 text-white">Community coming soon...</div></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
