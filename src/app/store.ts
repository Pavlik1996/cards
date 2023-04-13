import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'

import { authSlice } from '../Component/auth/auth-slice'
import { forgotReducer } from '../Component/forgot_password/forgot_redux/forgotPassSlice'
import { newPassReducer } from '../reducers/newPass-reducer'
import { profileReducer } from '../reducers/profile-reducer'
import { registrationReducer } from '../reducers/registration-reducer'

const rootReducers = combineReducers({
  auth: authSlice,
  newPass: newPassReducer,
  forgotPassword: forgotReducer,
  profile: profileReducer,
  registration: registrationReducer,
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