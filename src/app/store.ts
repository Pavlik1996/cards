import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { loginReducer } from '../reducers/login-reducer'
import { newPassReducer } from '../reducers/newPass-reducer'
import { passRecoveryReducer } from '../reducers/pass-recovery-reducer'
import { profileReducer } from '../reducers/profile-reducer'
import { registrationReducer } from '../reducers/registration-reducer'

const rootReducers = combineReducers({
  login: loginReducer,
  newPass: newPassReducer,
  passRecovery: passRecoveryReducer,
  profile: profileReducer,
  registration: registrationReducer,
})

export const store = configureStore({
  reducer: rootReducers,
})

export type RootStateType = ReturnType<typeof store.getState>
