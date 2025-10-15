import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { name?: string; email: string; avatar?: string } | null;
  onLogout: () => void;
};

import Logo from '../../assets/Logo.png';

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }: SidebarProps): JSX.Element {
  const navigate = useNavigate();
  const menuItems = ['Dashboard', 'Analytics', 'Users', 'Reports', 'Settings'];
  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 200, background: '#222', color: '#fff', height: '100vh', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '24px 0 32px 0' }}>
        <img src={Logo} alt="Logo" style={{ height: 131, marginBottom: -50 ,marginTop:-35,width:'130%'}} />
        {user && (
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontWeight: 'bold' }}>{user.name || 'User'}</div>
            <div style={{ fontSize: '0.9em', color: '#aaa' }}>{user.email}</div>
          </div>
        )}
      </div>
      <ul style={{ width: '100%' }}>
        {menuItems.map((item) => (
          <li
            key={item}
            className={activeTab === item ? 'active' : ''}
            onClick={() => setActiveTab(item)}
            style={{
              padding: '12px 24px',
              cursor: 'pointer',
              background: activeTab === item ? '#333' : 'none',
              fontWeight: activeTab === item ? 'bold' : 'normal',
              borderLeft: activeTab === item ? '4px solid #00bcd4' : '4px solid transparent',
              transition: 'background 0.2s',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <button 
        style={{ 
          position: 'absolute', 
          bottom: 24, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          padding: '8px 24px', 
          borderRadius: 4, 
          border: 'none', 
          background: '#444', 
          color: '#fff', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }} 
        onClick={async () => {
          try {
            await onLogout();
            toast.success('Logout successful!');
            setTimeout(() => navigate('/login', { replace: true }), 1200);
          } catch (err) {
            toast.error('Logout failed!');
          }
        }}
      >
        Logout
      </button>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </aside>
  );
}
