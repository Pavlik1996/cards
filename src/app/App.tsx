import React from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Error } from '../Component/404/Error'
import { CreateNewPassword } from '../Component/forgot_password/CreateNewPassword'
import { ForgotPassword } from '../Component/forgot_password/ForgotPassword'
import { CheckEmail } from '../Component/forgot_password/СheckEmail'
import { Login } from '../Component/Login/Login'
import { Profile } from '../Component/Profile/Profile'
import { Registration } from '../Component/Registration/Registration'
import { Test } from '../Component/test/test'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Profile />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/set-new-password/:id'} element={<CreateNewPassword />} />
        <Route path={'/forgotpassword'} element={<ForgotPassword />} />
        <Route path={'/checkemail'} element={<CheckEmail />} />
        <Route path={'/test'} element={<Test />} />
        <Route path={'/404'} element={<Error />} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}

export default App
