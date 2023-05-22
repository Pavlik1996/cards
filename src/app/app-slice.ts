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
  extraReducers: builder => {
    builder
      .addMatcher(
        action => {
          return action.type.endsWith('/pending')
        },
        state => {
          state.appStatus = 'loading'
        }
      )
      .addMatcher(
        action => {
          return action.type.endsWith('/rejected')
        },
        state => {
          state.appStatus = 'failed'
        }
      )
      .addMatcher(
        action => {
          return action.type.endsWith('/fulfilled')
        },
        state => {
          state.appStatus = 'succeeded'
        }
      )
  },
})

export const appSlice = slice.reducer
export const appActions = slice.actions
