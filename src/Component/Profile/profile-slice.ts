import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { appActions } from '../../app/app-slice'
import { authAPI } from '../auth/auth-api'

export type UserType = {
  _id: string
  email: string
  avatar?: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v?: number | undefined
  token?: string | undefined
  tokenDeathTime?: number | undefined
}

const initialState = {
  user: {} as UserType,
}

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    updateName: (state, action: PayloadAction<{ newName: string }>) => {
      state.user.name = action.payload.newName
    },
    updateUserAvatar: (state, action: PayloadAction<{ avatar: string }>) => {
      state.user.avatar = action.payload.avatar
    },
  },
})

export const updateUserName = (newName: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ appStatus: 'loading' }))
  authAPI.updateName(newName).then(res => {
    dispatch(profileActions.updateName({ newName: res.data.updatedUser.name }))
    dispatch(appActions.setAppStatus({ appStatus: 'succeeded' }))
  })
}

export const updateAvatar = (newAvatar: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ appStatus: 'loading' }))
  authAPI.updateAvatar(newAvatar).then(res => {
    dispatch(profileActions.updateUserAvatar({ avatar: res.data.updatedUser.avatar! }))
    dispatch(appActions.setAppStatus({ appStatus: 'succeeded' }))
  })
}

export const profileReducer = slice.reducer
export const profileActions = slice.actions
