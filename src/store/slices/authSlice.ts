import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginUser, registerUser, logoutUser, LoginResponse, User, setAuthToken } from '../../lib/api'

type AuthState = {
  user: User | null
  token: string | null
  loading: boolean
  error?: string | null
}

// Initialize from sessionStorage when available
const storedToken = sessionStorage.getItem('fc_token')
const storedUser = sessionStorage.getItem('fc_user')

const initialState: AuthState = {
  user: storedUser ? (JSON.parse(storedUser) as User) : null,
  token: storedToken || null,
  loading: false,
  error: null,
}

// Ensure axios has the token if present on initialization
if (storedToken) setAuthToken(storedToken)
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: { firstName?: string; lastName?: string; username?: string; email: string; password: string; phoneNumber?: string }) => {
    const user = await registerUser(data)
    return { user }
  }
)

export const loginThunk = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  // Call API, persist token and user information to sessionStorage, and set axios header
  const res: LoginResponse = await loginUser(email, password)
  const token = res.token
  // derive a User shape from the backend response (username -> email field for display)
  const user: User = { id: '', email: res.username }
  // store session data
  sessionStorage.setItem('fc_token', token)
  sessionStorage.setItem('fc_user', JSON.stringify(user))
  sessionStorage.setItem('fc_role', res.role ?? '')
  sessionStorage.setItem('fc_expiration', res.expiration ?? '')
  setAuthToken(token)
  return { user, token }
})

export const logoutThunk = createAsyncThunk('auth/logout', async (_arg: void, thunkApi) => {
  const state = (thunkApi.getState() as any)
  const token = state.auth.token
  await logoutUser(token)
  // clear session storage and axios header
  sessionStorage.removeItem('fc_token')
  sessionStorage.removeItem('fc_user')
  sessionStorage.removeItem('fc_role')
  sessionStorage.removeItem('fc_expiration')
  setAuthToken(undefined)
  return {}
})

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (s) => {
        s.loading = true
        s.error = null
      })
      .addCase(registerThunk.fulfilled, (s, a) => {
        s.loading = false
        s.user = a.payload.user
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.loading = false
        s.error = a.error.message ?? 'register failed'
      })
      .addCase(loginThunk.pending, (s) => {
        s.loading = true
        s.error = null
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.loading = false
        s.user = a.payload.user
        s.token = a.payload.token
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.loading = false
        s.error = a.error.message ?? 'login failed'
      })
      .addCase(logoutThunk.fulfilled, (s) => {
        s.user = null
        s.token = null
      })
  },
})

export const { setCredentials } = slice.actions
export default slice.reducer
