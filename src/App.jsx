import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz" element={<QuizPage />} />
      {/* Add more routes here as needed */}
    </Routes>
  );
}

export default App;
