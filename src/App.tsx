import React, { useEffect, useState } from 'react'
import { fetchHealth } from './lib/api'
import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import UserMenu from './components/UserMenu'
import { useAppSelector } from './store/hooks'

function AppShell(): JSX.Element {
  const [message, setMessage] = useState<string>('')
  useEffect(() => {
    fetchHealth()
      .then((m) => setMessage(m))
      .catch(() => setMessage('API unreachable'))
  }, [])

  const user = useAppSelector((s) => s.auth.user)

  return (
    <div className="app">
      <header>
        <h1>FusionCore Frontend</h1>
        <UserMenu />
      </header>
      <main>
        <p>Backend status: {message || 'loading...'}</p>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App(): JSX.Element {
  return <AppShell />
}
