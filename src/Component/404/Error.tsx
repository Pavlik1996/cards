import React from 'react'

import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import errorImage from '../../assets/imgs/404.svg'

import s from './error.module.css'

export const Error = () => {
  const navigate = useNavigate()

  const redirectHomeHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.wrapper}>
      <div>
        <div className={s.ops}>Ooooops!</div>
        <div className={s.sorry}>Sorry! Page not found!</div>
        <div>
          <Button variant={'contained'} onClick={redirectHomeHandler} className={s.btn}>
            Back to home page
          </Button>
        </div>
      </div>
      <div className={s.error}>
        <img src={errorImage} alt="404" />
      </div>
    </div>
  )
}
