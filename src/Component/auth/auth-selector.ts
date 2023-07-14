import { RootStateType } from '../../app/store'

export const selectAuthIsSignIn = (state: RootStateType) => state.auth.isSignIn
export const selectAuthIsSignUp = (state: RootStateType) => state.auth.isSignUp
