import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'

import { authSlice } from '../Component/auth/auth-slice'
import { newPassReducer } from '../reducers/newPass-reducer'
import { passRecoveryReducer } from '../reducers/pass-recovery-reducer'
import { profileReducer } from '../reducers/profile-reducer'
import { registrationReducer } from '../reducers/registration-reducer'

const rootReducers = combineReducers({
  auth: authSlice,
  newPass: newPassReducer,
  passRecovery: passRecoveryReducer,
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
