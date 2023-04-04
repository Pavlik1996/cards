import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

type initialStateType = typeof initialState

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
})

export const loginReducer = slice.reducer
export const loginActions = slice.actions
