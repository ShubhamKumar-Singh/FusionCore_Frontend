import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser, User } from '../../store/slices/usersSlice';

export default function UserForm({ user, onClose }: { user?: User; onClose: () => void }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [status, setStatus] = useState(user?.status || 'Awaiting file upload');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setRole(user?.role || '');
    setStatus(user?.status || 'Awaiting file upload');
  }, [user]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = user?.id || Math.random().toString(36).slice(2);
    if (user) {
      dispatch(updateUser({ id, name, email, role, status }));
    } else {
      dispatch(addUser({ id, name, email, role, status }));
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', color: '#222', padding: 20, borderRadius: 8, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: 18 }}>{user ? 'Edit User' : 'Add User'}</h3>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Role:</label>
        <input value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="Awaiting file upload">Awaiting file upload</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, fontSize: 15, cursor: 'pointer' }}>{user ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onClose} style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
      </div>
    </form>
  );
}
