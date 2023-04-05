import { AnyAction, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { forgotReducer } from '../Component/forgot_password/forgotPassSlice'
import { loginReducer } from '../reducers/login-reducer'
import { newPassReducer } from '../reducers/newPass-reducer'
import { profileReducer } from '../reducers/profile-reducer'
import { registrationReducer } from '../reducers/registration-reducer'

import { useDispatch } from 'react-redux'

const rootReducers = combineReducers({
  login: loginReducer,
  newPass: newPassReducer,
  forgotPassword: forgotReducer,
  profile: profileReducer,
  registration: registrationReducer,
})

export const store = configureStore({
  reducer: rootReducers,
})

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
// @ts-ignore
window.store = store
