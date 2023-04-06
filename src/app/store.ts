import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'

import { forgotReducer } from '../Component/forgot_password/forgot_redux/forgotPassSlice'
import { loginReducer } from '../reducers/login-reducer'
import { newPassReducer } from '../reducers/newPass-reducer'
import { profileReducer } from '../reducers/profile-reducer'
import { registrationReducer } from '../reducers/registration-reducer'

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
