import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Error } from '../Component/404/Error'
import { authThunks } from '../Component/auth/auth-slice'
import { Signin } from '../Component/auth/signin/Signin'
import { Signup } from '../Component/auth/signup/Signup'
import { CardsList } from '../Component/cards/CardsList'
import { ErrorSnackbar } from '../Component/error-snackbar/ErrorSnackBar'
import { CreateNewPassword } from '../Component/forgot_password/components/CreateNewPassword'
import { ForgotPassword } from '../Component/forgot_password/components/ForgotPassword'
import { CheckEmail } from '../Component/forgot_password/components/СheckEmail'
import { LearnList } from '../Component/Learn/LearnList'
import { Packs } from '../Component/packs/Packs'
import { Profile } from '../Component/Profile/Profile'
import { Test } from '../Component/test/test'

import { selectAppStatus, selectAuthIsInitialized } from './app-selectors'
import { useAppDispatch } from './store'

export function App() {
  const appStatus = useSelector(selectAppStatus)
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
      <div className={'App-status'}>{appStatus === 'loading' && <LinearProgress />}</div>
      <ErrorSnackbar />
      <Routes>
        <Route path={'/'} element={<Profile />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/set-new-password/:id'} element={<CreateNewPassword />} />
        <Route path={'/forgotpassword'} element={<ForgotPassword />} />
        <Route path={'/checkemail'} element={<CheckEmail />} />
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/packs'} element={<Packs />} />
        <Route path={'/tablecards/:id'} element={<CardsList />} />
        <Route path={'/test'} element={<Test />} />
        <Route path={'/404'} element={<Error />} />
        <Route path={'/learn/:id'} element={<LearnList />} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}

export default App
