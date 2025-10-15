import React from 'react';
type UserCardProps = {
  user: { name?: string; email: string; avatar?: string } | null;
  onLogout: () => void;
};

export default function UserCard({ user, onLogout }: UserCardProps): JSX.Element | null {
  if (!user) return null;
  return (
    <div className="user-card">
      <img src={user.avatar || 'https://i.pravatar.cc/40'} alt="User Avatar" className="avatar" />
      <div className="user-info">
        <span className="user-name">{user.name || 'User'}</span>
        <span className="user-email">{user.email}</span>
      </div>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
