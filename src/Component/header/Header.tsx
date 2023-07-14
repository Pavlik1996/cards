import React from 'react'

import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootStateType, useAppSelector } from '../../app/store'
import avatar from '../../assets/imgs/avatarBig.png'
import logo from '../../assets/imgs/logoIncubator.svg'
import { selectAuthIsSignIn } from '../auth/auth-selector'

import s from './Header.module.css'

export const Header = () => {
  const navigate = useNavigate()
  const signin = useSelector(selectAuthIsSignIn)
  const user = useAppSelector((state: RootStateType) => state.profile.user)
  const userAvatar = useAppSelector((state: RootStateType) => state.profile.user.avatar) || avatar
  const userName = user.name == undefined ? user.email : user.name

  const redirectLoginHandler = () => {
    navigate('/signin')
  }

  const redirectHomeHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.wrapper}>
      <img src={logo} alt={'logo it-incubator'} onClick={redirectHomeHandler} className={s.logo} />
      <div className={s.headerInfo}>
        {signin ? (
          <>
            <span>{userName}</span>
            <img src={userAvatar} alt="user avatar" className={s.avatar} />
          </>
        ) : (
          <Button variant={'contained'} className={s.btn} onClick={redirectLoginHandler}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
