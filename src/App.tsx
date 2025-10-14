import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { useAppSelector } from './store/hooks';
import LoginForm from './components/Auth/Login';
import RegisterForm from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';

export default function App(): JSX.Element {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}
