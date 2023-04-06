import React from 'react'

import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { RootStateType } from '../../../app/store'
import { ReactComponent as Email } from '../images/emailicon.svg'
import style from '../styles/checkemail.module.css'

export const CheckEmail = () => {
  const isForgot = useSelector<RootStateType, boolean>(state => state.forgotPassword.isForgot)
  let navigate = useNavigate()
  const routeChange = () => {
    navigate('/login')
  }

  if (!isForgot) {
    return <Navigate to={'/forgotpassword'} />
  }

  return (
    <div className={style.wrapper}>
      <div className={style.forgot}>
        <h2 className={style.title}>Check Email</h2>
        <Email />
        <p className={style.infoText}>We’ve sent an Email with instructions to example@mail.com</p>
        <Button className={style.btn} type={'submit'} variant={'contained'} onClick={routeChange}>
          Back to login
        </Button>
      </div>
    </div>
  )
}
