import { RootStateType } from '../../app/store'

export const selectAuthIsSignin = (state: RootStateType) => state.auth.isSignin
export const selectAuthIsSignup = (state: RootStateType) => state.auth.isSignup
