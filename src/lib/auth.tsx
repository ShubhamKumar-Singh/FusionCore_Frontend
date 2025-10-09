import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginUser, logoutUser, registerUser, User } from './api'

type AuthState = {
  user: User | null
  token: string | null
}

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('fc_user')
    return raw ? (JSON.parse(raw) as User) : null
  })
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('fc_token'))

  useEffect(() => {
    if (user) localStorage.setItem('fc_user', JSON.stringify(user))
    else localStorage.removeItem('fc_user')
  }, [user])

  useEffect(() => {
    if (token) localStorage.setItem('fc_token', token)
    else localStorage.removeItem('fc_token')
  }, [token])

  async function login(email: string, password: string) {
    const res = await loginUser(email, password)
    setUser(res.user)
    setToken(res.token)
  }

  async function register(email: string, password: string) {
    const u = await registerUser(email, password)
    // optionally auto-login; here we just set user
    setUser(u)
  }

  async function logout() {
    await logoutUser(token)
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
