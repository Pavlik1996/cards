import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

type initialStateType = typeof initialState

const slice = createSlice({
    name: 'passRecovery',
    initialState,
    reducers: {}
})


export const passRecoveryReducer = slice.reducer
export const passRecoveryActions = slice.actions