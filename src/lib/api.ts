import axios from 'axios'

const API_BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'

export async function fetchHealth(): Promise<string> {
  const url = `${API_BASE.replace(/\/$/, '')}/health`
  const res = await axios.get<{ status: string }>(url, { timeout: 3000 })
  return res.data?.status ?? 'unknown'
}

// --- Auth API ---
export type User = { id: string; email: string }

export async function registerUser(email: string, password: string): Promise<User> {
  const url = `${API_BASE.replace(/\/$/, '')}/auth/register`
  const res = await axios.post<User>(url, { email, password })
  return res.data
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: User }> {
  const url = `${API_BASE.replace(/\/$/, '')}/auth/login`
  const res = await axios.post<{ token: string; user: User }>(url, { email, password })
  return res.data
}

export async function logoutUser(token: string | null): Promise<void> {
  const url = `${API_BASE.replace(/\/$/, '')}/auth/logout`
  await axios.post(url, {}, { headers: { Authorization: token ? `Bearer ${token}` : '' } })
}

