import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { forgotApi, forgotDataType, newPasswordDataType } from './forgotApi'

const initialState = {
  isForgot: false,
  enterPassword: false,
}

//slice
const slice = createSlice({
  name: 'forgotPassSlice',
  initialState,
  reducers: {
    setIsForgot(state, action: PayloadAction<{ isForgot: boolean }>) {
      state.isForgot = action.payload.isForgot
    },
    setEnterPassword(state, action: PayloadAction<{ enterPassword: boolean }>) {
      state.enterPassword = action.payload.enterPassword
    },
  },
})

export const forgotReducer = slice.reducer
export const forgotActions = slice.actions

//thunks
export const forgotPassword = (data: forgotDataType) => (dispatch: Dispatch) => {
  forgotApi.forgot(data).then(res => {
    dispatch(forgotActions.setIsForgot({ isForgot: true }))
  })
}

export const enterNewPassword = (data: newPasswordDataType) => (dispatch: Dispatch) => {
  forgotApi
    .newPassword(data)
    .then(res => dispatch(forgotActions.setEnterPassword({ enterPassword: true })))
}

//types
type initialStateType = typeof initialState
