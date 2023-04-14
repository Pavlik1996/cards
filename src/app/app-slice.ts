import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType } from '../common/types/types'

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null as string | null,
    appStatus: 'idle' as RequestStatusType,
  },
  reducers: {
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ appStatus: RequestStatusType }>) => {
      state.appStatus = action.payload.appStatus
    },
  },
})

export const appSlice = slice.reducer
export const appActions = slice.actions
