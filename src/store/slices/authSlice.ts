import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginUser, registerUser, logoutUser, User } from '../../lib/api'

type AuthState = {
  user: User | null
  token: string | null
  loading: boolean
  error?: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

export const registerThunk = createAsyncThunk('auth/register', async ({ email, password }: { email: string; password: string }) => {
  const user = await registerUser(email, password)
  return { user }
})

export const loginThunk = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  const res = await loginUser(email, password)
  return { user: res.user, token: res.token }
})

export const logoutThunk = createAsyncThunk('auth/logout', async (_arg: void, thunkApi) => {
  const state = (thunkApi.getState() as any)
  const token = state.auth.token
  await logoutUser(token)
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
