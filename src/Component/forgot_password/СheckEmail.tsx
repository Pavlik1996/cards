import React from 'react'

import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import style from './checkemail.module.css'
import { ReactComponent as Email } from './images/emailicon.svg'

export const CheckEmail = () => {
  let navigate = useNavigate()
  const routeChange = () => {
    navigate('/login')
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
