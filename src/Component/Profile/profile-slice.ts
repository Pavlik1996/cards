import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../auth/auth-api'
import { authActions } from '../auth/auth-slice'

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

// type initialStateType = typeof initialState

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
    updateUserAvatar: (state, action: PayloadAction<string | undefined>) => {
      state.user.avatar = action.payload
    },
  },
})

export const updateUserName = (newName: string) => (dispatch: Dispatch) => {
  dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
  authAPI.updateName(newName).then(res => {
    dispatch(profileActions.updateName({ newName: res.data.updatedUser.name }))
    dispatch(authActions.setAuthStatus({ authStatus: 'succeeded' }))
  })
}

export const updateAvatar = (newAvatar: string) => (dispatch: Dispatch) => {
  dispatch(authActions.setAuthStatus({ authStatus: 'loading' }))
  authAPI.updateAvatar(newAvatar).then(res => {
    dispatch(profileActions.updateUserAvatar(res.data.updatedUser.avatar))
  })
}

export const profileReducer = slice.reducer
export const profileActions = slice.actions
