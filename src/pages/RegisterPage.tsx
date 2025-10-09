// src/pages/RegisterPage.tsx
import React, { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { registerThunk } from '../store/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await dispatch(registerThunk({ email, password })).unwrap()
      navigate('/login')
    } catch (err: any) {
      setError(err.message || 'Failed to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-sm w-100" style={{ maxWidth: 540 }}>
        <div className="card-body">
          <h2 className="card-title text-center text-primary mb-4">Create Your Account</h2>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating Account...' : 'Register'}</button>
            </div>
          </form>

          <div className="text-center mt-3 small">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
