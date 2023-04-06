import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { forgotApi, forgotDataType, newPasswordDataType } from '../forgot_api/forgotApi'

const initialState = {
  isForgot: false,
  enterPassword: false,
  progress: false,
  error: null as string | null,
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
    setProgress(state, action: PayloadAction<{ progress: boolean }>) {
      state.progress = action.payload.progress
    },
  },
})

export const forgotReducer = slice.reducer
export const forgotActions = slice.actions

//thunks
export const forgotPassword = (data: forgotDataType) => (dispatch: Dispatch) => {
  dispatch(forgotActions.setProgress({ progress: true }))
  forgotApi.forgot(data).then(res => {
    dispatch(forgotActions.setIsForgot({ isForgot: true }))
    dispatch(forgotActions.setProgress({ progress: false }))
  })
}

export const enterNewPassword = (data: newPasswordDataType) => (dispatch: Dispatch) => {
  dispatch(forgotActions.setProgress({ progress: true }))
  forgotApi.newPassword(data).then(res => {
    dispatch(forgotActions.setEnterPassword({ enterPassword: true }))
    dispatch(forgotActions.setProgress({ progress: false }))
  })
}

//types
type initialStateType = typeof initialState
