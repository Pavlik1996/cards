import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '../../utils/create-app-async-thunk'
import { handleAxiosError } from '../../utils/handle-axios-error'

import { authAPI, SigninParamsType, SignupParamsType } from './auth-api'

const signin = createAppAsyncThunk<{ isSignin: boolean }, SigninParamsType>(
  'auth/signin',
  async (data: SigninParamsType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
      const res = await authAPI.signin(data)

      dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))

      return { isSignin: true }
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)
const signup = createAppAsyncThunk<{ isSignup: boolean }, SignupParamsType>(
  'auth/signup',
  async (data: SignupParamsType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
      const res = await authAPI.signup(data)

      dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))

      return { isSignup: true }
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)
const initialized = createAppAsyncThunk<
  { isInitialized: boolean; isSignin?: boolean; isSignup?: boolean },
  undefined
>('auth/initialized', async (args, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    const res = await authAPI.me()

    return { isSignin: true, isSignup: true, isInitialized: true }
  } catch (e) {
    handleAxiosError(dispatch, e)

    return rejectWithValue({ isInitialized: true })
  }
})

const slice = createSlice({
  name: 'auth',
  initialState: {
    isSignin: false,
    isSignup: false,
    isInitialized: false as boolean | undefined,
    error: null as string | null,
    authStatus: 'idle' as RequestStatusType,
  },
  reducers: {
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAuthStatus: (state, action: PayloadAction<{ authStatus: RequestStatusType }>) => {
      state.authStatus = action.payload.authStatus
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.isSignin = action.payload.isSignin
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSignup = action.payload.isSignup
      })
      .addCase(initialized.fulfilled, (state, action) => {
        state = { ...state, ...action.payload }

        return state
      })
      .addCase(initialized.rejected, (state, action) => {
        state.isInitialized = action.payload?.isInitialized
      })
  },
})

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = { signin, signup, initialized }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
