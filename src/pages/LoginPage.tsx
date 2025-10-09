import React, { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { loginThunk } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await dispatch(loginThunk({ email, password })).unwrap()
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-sm w-100" style={{ maxWidth: 540 }}>
        <div className="card-body">
          <h2 className="card-title text-center text-primary mb-4">Sign in</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center mt-3 small">
            <button type="button" className="btn btn-link p-0" onClick={() => navigate('/register')}>Create account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
