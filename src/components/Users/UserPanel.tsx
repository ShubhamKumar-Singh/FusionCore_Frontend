import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import { User } from '../../store/slices/usersSlice';

export default function UserPanel() {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | undefined>(undefined);
  const [search, setSearch] = useState('');

  function handleAdd() {
    setEditUser(undefined);
    setShowForm(true);
  }

  function handleEdit(user: User) {
    setEditUser(user);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setEditUser(undefined);
  }

  return (
    <div style={{ position: 'relative', minHeight: 500 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', minWidth: 200 }}
          />
          <button style={{ background: '#f3f3f3', border: 'none', borderRadius: 6, padding: '8px 12px', cursor: 'pointer' }}>
            &#128269;
          </button>
        </div>
        <button
          onClick={handleAdd}
          style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontWeight: 500, fontSize: 16, cursor: 'pointer', width: '10%' }}
        >
          + New User
        </button>
      </div>

      {/* User List */}
      <UserList onEdit={handleEdit} search={search} />

      {/* Sliding panel for form */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: showForm ? 0 : '-400px',
          width: 370,
          height: '100%',
          background: '#fff',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
          transition: 'right 0.3s',
          zIndex: 100,
          padding: '32px 24px',
        }}
      >
        {showForm && <UserForm user={editUser} onClose={handleCloseForm} />}
      </div>
      {/* Overlay when panel is open */}
      {showForm && (
        <div
          onClick={handleCloseForm}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.15)',
            zIndex: 99,
          }}
        />
      )}
    </div>
  );
}
