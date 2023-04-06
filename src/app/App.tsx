import React from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Error } from '../Component/404/Error'
import { initialized } from '../Component/auth/auth-slice'
import { Signin } from '../Component/auth/signin/Signin'
import { Signup } from '../Component/auth/signup/Signup'
import { ErrorSnackbar } from '../Component/ErrorSnackbar/ErrorSnackBar'
import { NewPass } from '../Component/newPass/newPass'
import { PassRecovery } from '../Component/passwordRecovery/passRecovery'
import { CreateNewPassword } from '../Component/forgot_password/components/CreateNewPassword'
import { ForgotPassword } from '../Component/forgot_password/components/ForgotPassword'
import { CheckEmail } from '../Component/forgot_password/components/СheckEmail'
import { Login } from '../Component/Login/Login'
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
    dispatch(initialized())
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
        <Route path={'/login'} element={<Login />} />
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/set-new-password/:id'} element={<CreateNewPassword />} />
        <Route path={'/forgotpassword'} element={<ForgotPassword />} />
        <Route path={'/checkemail'} element={<CheckEmail />} />
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/passrecovery'} element={<PassRecovery />} />
        <Route path={'/newpass'} element={<NewPass />} />
        <Route path={'/test'} element={<Test />} />
        <Route path={'/404'} element={<Error />} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}

export default App
