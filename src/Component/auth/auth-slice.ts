import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType } from '../../common/types/types'
import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'
import { handleAxiosError } from '../../common/utils/handle-axios-error'
import { profileActions, UserType } from '../Profile/profile-slice'

import { authAPI, SignInParamsType, SignupParamsType } from './auth-api'

export const initialized = createAppAsyncThunk<void, void>(
  'auth/initialized',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      const res = await authAPI.me()

      dispatch(profileActions.setUser(res))
      dispatch(authActions.setSignIn({ isSignIn: true }))
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    } finally {
      dispatch(authActions.setIsInitialized({ isInitialized: true }))
    }
  }
)

const signin = createAppAsyncThunk<{ isSignIn: boolean }, SignInParamsType>(
  'auth/signin',
  async (data: SignInParamsType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
      await authAPI.signin(data)

      dispatch(authThunks.initialized())
      dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))

      return { isSignIn: true }
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)
const signup = createAppAsyncThunk<{ isSignUp: boolean }, SignupParamsType>(
  'auth/signup',
  async (data: SignupParamsType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
      await authAPI.signup(data)

      dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))

      return { isSignUp: true }
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)

export const makeLogout = () => (dispatch: Dispatch) => {
  dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
  authAPI
    .logout()
    .then(() => {
      dispatch(authActions.setSignIn({ isSignIn: false }))
      dispatch(profileActions.setUser({} as UserType))
      dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))
    })
    .catch(error => {
      dispatch(authActions.setError({ error: error.data.info }))
      dispatch(authActions.setAuthStatus({ authStatus: 'failed' }))
    })
}

const slice = createSlice({
  name: 'auth',
  initialState: {
    isSignIn: false,
    isSignUp: false,
    isInitialized: false as boolean | undefined,
    error: null as string | null,
    authStatus: 'idle' as RequestStatusType,
    user_id: '',
  },
  reducers: {
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setSignIn: (state, action: PayloadAction<{ isSignIn: boolean }>) => {
      state.isSignIn = action.payload.isSignIn
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAuthStatus: (state, action: PayloadAction<{ authStatus: RequestStatusType }>) => {
      state.authStatus = action.payload.authStatus
    },
    setLogout: (state, action: PayloadAction<{ isSignIn: boolean }>) => {
      state.isSignIn = action.payload.isSignIn
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.isSignIn = action.payload.isSignIn
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSignUp = action.payload.isSignUp
      })
  },
})

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = { signIn: signin, signup, initialized }
