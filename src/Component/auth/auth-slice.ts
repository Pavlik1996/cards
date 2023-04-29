import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { profileActions, UserType } from '../Profile/profile-slice'

import { authAPI, SigninParamsType, SignupParamsType } from './auth-api'

type InitialStateType = {
  isSignin: boolean
  isSignup: boolean
  isInitialized: boolean
  error: string | null
  authStatus: RequestStatusType
}

const slice = createSlice({
  name: 'auth',
  initialState: {
    isSignin: false,
    isSignup: false,
    isInitialized: false,
    error: null as string | null,
    authStatus: 'idle' /*as RequestStatusType*/,
  } as InitialStateType,
  reducers: {
    setIsSignin: (state, action: PayloadAction<{ isSignin: boolean }>) => {
      state.isSignin = action.payload.isSignin
    },
    setIsSignup: (state, action: PayloadAction<{ isSignup: boolean }>) => {
      state.isSignup = action.payload.isSignup
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAuthStatus: (state, action: PayloadAction<{ authStatus: RequestStatusType }>) => {
      state.authStatus = action.payload.authStatus
    },
    setLogout: (state, action: PayloadAction<{ isSignin: boolean }>) => {
      state.isSignin = action.payload.isSignin
    },
  },
})

export const authSlice = slice.reducer
export const authActions = slice.actions

export const signin = (data: SigninParamsType) => (dispatch: Dispatch) => {
  dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
  authAPI
    .signin(data)
    .then(res => {
      dispatch(authActions.setIsSignin({ isSignin: true }))
      dispatch(authActions.setIsSignup({ isSignup: true }))
      dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))
      // dispatch(authActions.setUser({ user: res.data }))
    })
    .catch(error => {
      dispatch(authActions.setError({ error: error.message }))
      dispatch(authActions.setAuthStatus({ authStatus: 'failed' }))
    })
}

export const signup = (data: SignupParamsType) => (dispatch: Dispatch) => {
  dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
  authAPI
    .signup(data)
    .then(res => {
      dispatch(authActions.setIsSignup({ isSignup: true }))
      dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))
    })
    .catch(error => {
      dispatch(authActions.setError({ error: error.message }))
      dispatch(authActions.setAuthStatus({ authStatus: 'failed' }))
    })
}

export const initialized = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      dispatch(authActions.setIsSignin({ isSignin: true }))
      dispatch(authActions.setIsSignup({ isSignup: true }))
      dispatch(authActions.setIsInitialized({ isInitialized: true }))
    })
    .catch(error => {
      dispatch(authActions.setError({ error: error.response.data['error'] }))
      dispatch(authActions.setIsInitialized({ isInitialized: true }))
    })
}

export const makeLogout = () => (dispatch: Dispatch) => {
  dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
  authAPI
    .logout()
    .then(res => {
      dispatch(authActions.setIsSignin({ isSignin: false }))
      dispatch(profileActions.setUser({} as UserType))
      dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))
    })
    .catch(error => {
      dispatch(authActions.setError({ error: error.data.info }))
      dispatch(authActions.setAuthStatus({ authStatus: 'failed' }))
    })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
