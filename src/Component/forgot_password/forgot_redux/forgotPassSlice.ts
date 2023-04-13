import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { forgotApi, forgotDataType, newPasswordDataType } from '../forgot_api/forgotApi'

const forgotPassword = createAsyncThunk(
  'forgot/forgotPassword',
  async (data: forgotDataType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(forgotActions.setProgress({ progress: true }))
      await forgotApi.forgot(data)

      dispatch(forgotActions.setProgress({ progress: false }))
      dispatch(forgotActions.setIsForgot({ isForgot: true }))
    } catch (error) {
      return rejectWithValue(null)
    }
  }
)

const enterNewPassword = createAsyncThunk(
  'forgot/enterNewPassword',
  async (data: newPasswordDataType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(forgotActions.setProgress({ progress: true }))
      await forgotApi.newPassword(data)
      dispatch(forgotActions.setEnterPassword({ enterPassword: true }))
      dispatch(forgotActions.setProgress({ progress: false }))
    } catch (error) {
      return rejectWithValue(null)
    }
  }
)

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
export const forgotThunks = { forgotPassword, enterNewPassword }
