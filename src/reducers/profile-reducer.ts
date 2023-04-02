import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

type initialStateType = typeof initialState

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {}
})


export const profileReducer = slice.reducer
export const profileActions = slice.actions