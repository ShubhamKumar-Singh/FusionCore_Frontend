import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deleteUser, User } from '../../store/slices/usersSlice';

export default function UserList({ onEdit, search }: { onEdit: (user: User) => void; search: string }) {
  const users = useSelector((state: RootState) => state.users as User[]);
  const dispatch = useDispatch();
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginBottom: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', color: '#222', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <thead>
          <tr style={{ background: '#f7f7f7' }}>
            <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Role</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user: User) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 12 }}>{user.name}</td>
              <td style={{ padding: 12 }}>{user.email}</td>
              <td style={{ padding: 12 }}>{user.role}</td>
              <td style={{ padding: 12 }}>
                <span style={{ background: '#ffa726', color: '#fff', borderRadius: 6, padding: '4px 12px', fontWeight: 500, fontSize: 13 }}>{user.status}</span>
              </td>
              <td style={{ padding: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                  <button onClick={() => onEdit(user)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => dispatch(deleteUser(user.id))} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
