import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

type initialStateType = typeof initialState

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
})

export const registrationReducer = slice.reducer
export const registrationActions = slice.actions
