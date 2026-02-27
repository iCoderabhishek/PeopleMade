import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthResponse, LoginCredentials } from '@/features/auth/types/auth-types'
import { loginUser } from '@/features/auth/services/auth.service'

interface AuthState {
  isLoggedIn: boolean
  user: AuthResponse | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null,
}

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      return await loginUser(credentials)
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    clearError: (state) => {
      state.error = null
    },
    restoreAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.user = action.payload.user
      state.token = action.payload.token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user = action.payload
        state.token = action.payload.accessToken
        state.loading = false
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, clearError, restoreAuth } = authSlice.actions
export default authSlice.reducer
