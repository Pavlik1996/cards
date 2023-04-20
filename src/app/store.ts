import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'

import { authSlice } from '../Component/auth/auth-slice'
import { cardsReducer } from '../Component/cards/CardsSlice'
import { forgotReducer } from '../Component/forgot_password/forgot_redux/forgotPassSlice'
import { packsSlice } from '../Component/packs/packs-slice'
import { profileReducer } from '../reducers/profile-reducer'

// eslint-disable-next-line import/namespace
import { appSlice } from './app-slice'

const rootReducers = combineReducers({
  app: appSlice,
  auth: authSlice,
  forgotPassword: forgotReducer,
  profile: profileReducer,
  packs: packsSlice,
  cards: cardsReducer,
})

export const store = configureStore({
  reducer: rootReducers,
})

export type RootStateType = ReturnType<typeof store.getState>

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
// @ts-ignore
window.store = store
