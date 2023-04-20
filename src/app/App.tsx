import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Error } from '../Component/404/Error'
import { authThunks } from '../Component/auth/auth-slice'
import { Signin } from '../Component/auth/signin/Signin'
import { Signup } from '../Component/auth/signup/Signup'
import { CardsList } from '../Component/cards/CardsList'
import { ErrorSnackbar } from '../Component/ErrorSnackbar/ErrorSnackBar'
import { CreateNewPassword } from '../Component/forgot_password/components/CreateNewPassword'
import { ForgotPassword } from '../Component/forgot_password/components/ForgotPassword'
import { CheckEmail } from '../Component/forgot_password/components/СheckEmail'
import { PassRecovery } from '../Component/passwordRecovery/passRecovery'
import { Profile } from '../Component/Profile/Profile'
import { Registration } from '../Component/Registration/Registration'
import { Test } from '../Component/test/test'

import { selectAuthIsInitialized, selectAuthStatus } from './app-selectors'
import { useAppDispatch } from './store'

export function App() {
  const authStatus = useSelector(selectAuthStatus)
  const authIsInitialized = useSelector(selectAuthIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initialized())
  }, [])

  if (!authIsInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      {authStatus === 'loading' && (
        <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
          <CircularProgress />
        </div>
      )}
      <ErrorSnackbar />
      <Routes>
        <Route path={'/'} element={<Profile />} />
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/set-new-password/:id'} element={<CreateNewPassword />} />
        <Route path={'/forgotpassword'} element={<ForgotPassword />} />
        <Route path={'/checkemail'} element={<CheckEmail />} />
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/passrecovery'} element={<PassRecovery />} />
        <Route path={'/tablecards'} element={<CardsList />} />
        <Route path={'/test'} element={<Test />} />
        <Route path={'/404'} element={<Error />} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}

export default App
