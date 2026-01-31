import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './components/layout/AppLayout';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Pantry from './components/pages/Pantry';
import WasteLogs from './components/pages/WasteLogs';
import Reports from './components/pages/Reports';
import Donations from './components/pages/Donations';
import Suppliers from './components/pages/Suppliers';
import Team from './components/pages/Team';
import Settings from './components/pages/Settings';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pantry" element={<Pantry />} />
            {/* Placeholders for other routes */}
            <Route path="/waste" element={<WasteLogs />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/team" element={<Team />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
