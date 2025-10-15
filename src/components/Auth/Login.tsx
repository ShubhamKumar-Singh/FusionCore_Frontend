import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks'
import { loginThunk } from '../../store/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Password validation (min 6 chars)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message ?? 'Login failed');
      toast.error(err?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <label>
            Enter your email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Enter your password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="options">
            <a href="#" className="forgot">Forgot password?</a>
          </div>

          {/* {error && <div className="error">{error}</div>} */}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Log In'}
          </button>

          <p className="register">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
