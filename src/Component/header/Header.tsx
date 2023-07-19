import React, { useState } from 'react'

import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import avatar from '../../assets/imgs/avatarBig.png'
import logo from '../../assets/imgs/logoIncubator.svg'
import { selectAuthIsSignIn } from '../auth/auth-selector'
import { selectUser, selectUserAvatar } from '../Profile/profile-selector'

import s from './Header.module.css'
import { HeaderModal } from './headerModal/HeaderModal'

export const Header = () => {
  const navigate = useNavigate()
  const signIn = useAppSelector(selectAuthIsSignIn)
  const user = useAppSelector(selectUser)
  const userAvatar = useAppSelector(selectUserAvatar) || avatar
  const userName = user.name ? user.name : user.email
  const [showModal, setShowModal] = useState(false)

  const redirectLoginHandler = () => {
    navigate('/signin')
  }

  const redirectHomeHandler = () => {
    navigate('/')
  }

  const showModalChangeHandler = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={s.wrapper}>
      <img src={logo} alt={'logo it-incubator'} onClick={redirectHomeHandler} className={s.logo} />
      <div className={s.headerInfo}>
        {signIn ? (
          <div className={s.userBlock}>
            <span>{userName}</span>
            <img
              src={userAvatar}
              alt="user avatar"
              className={s.avatar}
              onClick={showModalChangeHandler}
            />
            {showModal && <HeaderModal />}
          </div>
        ) : (
          <Button variant={'contained'} className={s.btn} onClick={redirectLoginHandler}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
