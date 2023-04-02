import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

type initialStateType = typeof initialState

const slice = createSlice({
    name: 'newPass',
    initialState,
    reducers: {}
})



export const newPassReducer = slice.reducer
export const newPassActions = slice.actions