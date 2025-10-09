import React from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logoutThunk } from '../store/slices/authSlice'

export default function Dashboard(): JSX.Element {
  const user = useAppSelector((s) => s.auth.user)
  const dispatch = useAppDispatch()

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div className="card shadow-sm w-100" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <h2 className="card-title">Dashboard</h2>
          <p className="lead">Welcome, {user?.email}</p>
          <div className="mt-3">
            <button className="btn btn-outline-secondary" onClick={() => void dispatch(logoutThunk())}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
