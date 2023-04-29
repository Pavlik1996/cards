import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

import { authSlice } from '../Component/auth/auth-slice'
import { cardsReducer } from '../Component/cards/CardsSlice'
import { forgotReducer } from '../Component/forgot_password/forgot_redux/forgotPassSlice'
import { packsSearchParamsSlice } from '../Component/packs/packs-search-params-slice'
import { packsSlice } from '../Component/packs/packs-slice'

import { appSlice } from './app-slice'

const rootReducers = combineReducers({
  app: appSlice,
  auth: authSlice,
  forgotPassword: forgotReducer,
  packs: packsSlice,
  packsSearchParams: packsSearchParamsSlice,
  cards: cardsReducer,
})

export const store = configureStore({
  reducer: rootReducers,
})

export type RootStateType = ReturnType<typeof rootReducers>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

// @ts-ignore
window.store = store
