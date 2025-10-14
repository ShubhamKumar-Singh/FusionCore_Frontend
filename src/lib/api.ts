import axios from 'axios'

const API_BASE = (import.meta.env.VITE_API_URL as string) || 'https://localhost:7094'

export async function fetchHealth(): Promise<string> {
  const url = `${API_BASE.replace(/\/$/, '')}/health`
  const res = await axios.get<{ status: string }>(url, { timeout: 3000 })
  return res.data?.status ?? 'unknown'
}

// --- Auth API ---
export type User = { id: string; email: string }
export async function registerUser(data: { firstName?: string; lastName?: string; username?: string; email: string; password: string; phoneNumber?: string }): Promise<User> {
  const url = `${API_BASE.replace(/\/$/, '')}/api/Auth/register`;
  const res = await axios.post<User>(url, data);
  return res.data;
}

// Backend login response shape (example): { token, username, role, expiration }
export type LoginResponse = { token: string; username: string; role?: string; expiration?: string }

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const url = `${API_BASE.replace(/\/$/, '')}/api/Auth/login`
  const res = await axios.post<LoginResponse>(url, { email, password })
  return res.data
}

export async function logoutUser(token: string | null): Promise<void> {
  const url = `${API_BASE.replace(/\/$/, '')}/api/Auth/logout`
  await axios.post(url, {}, { headers: { Authorization: token ? `Bearer ${token}` : '' } })
}

// Helper to set default Authorization header for axios
export function setAuthToken(token?: string | null) {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']
}

