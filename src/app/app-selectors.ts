import { RootStateType } from './store'

export const selectAuthStatus = (state: RootStateType) => state.auth.authStatus
export const selectAuthIsInitialized = (state: RootStateType) => state.auth.isInitialized
export const selectAuthIsSignin = (state: RootStateType) => state.auth.isSignin
export const selectAuthIsSignup = (state: RootStateType) => state.auth.isSignup
