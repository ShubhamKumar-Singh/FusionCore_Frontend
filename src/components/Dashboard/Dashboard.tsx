import React from 'react';
import './dashboard.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import { useState } from 'react';
import { useAuth } from '../../lib/auth';

export default function Dashboard(): JSX.Element {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { user, logout } = useAuth();
  return (
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: 240, minWidth: 200 }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={logout} />
      </div>
      <main style={{ flex: 1 }}>
        <DashboardContent activeTab={activeTab} />
      </main>
    </div>
  );
}
