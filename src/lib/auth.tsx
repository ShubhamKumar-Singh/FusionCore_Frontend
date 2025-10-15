import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, registerUser, setAuthToken, LoginResponse, User } from './api'

type AuthState = {
  user: User | null
  token: string | null
}

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>
  register: (data: { firstName: string; lastName: string; username: string; email: string; password: string; phoneNumber: string }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // initialize from sessionStorage
  const [user, setUser] = useState<User | null>(() => {
    const raw = sessionStorage.getItem('fc_user')
    return raw ? (JSON.parse(raw) as User) : null
  })
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('fc_token'))

  useEffect(() => {
    if (user) sessionStorage.setItem('fc_user', JSON.stringify(user))
    else sessionStorage.removeItem('fc_user')
  }, [user])

  useEffect(() => {
    if (token) sessionStorage.setItem('fc_token', token)
    else sessionStorage.removeItem('fc_token')
  }, [token])

  async function login(email: string, password: string) {
    const res: LoginResponse = await loginUser(email, password)
    // backend returns { token, username, role, expiration }
    const u: User = { id: '', email: res.username }
    setUser(u)
    setToken(res.token)
    // persist other metadata
    sessionStorage.setItem('fc_role', res.role ?? '')
    sessionStorage.setItem('fc_expiration', res.expiration ?? '')
    setAuthToken(res.token)
  }

  async function register(data: { firstName?: string; lastName?: string; username?: string; email: string; password: string; phoneNumber?: string }) {
    const u = await registerUser(data)
    setUser(u)
  }

  async function logout() {
    await logoutUser(token);
    setUser(null);
    setToken(null);
    sessionStorage.clear();
    setAuthToken(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
