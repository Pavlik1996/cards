import { RootStateType } from '../../../app/store'

export const isForgotSelect = (state: RootStateType) => state.forgotPassword.isForgot

export const progressForgotSelect = (state: RootStateType) => state.forgotPassword.progress
