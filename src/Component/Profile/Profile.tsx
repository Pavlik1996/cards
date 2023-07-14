import React from 'react'

import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { selectAuthIsSignin } from '../../app/app-selectors'
import { RootStateType, useAppDispatch, useAppSelector } from '../../app/store'
import avatar from '../../assets/imgs/avatarBig.png'
import logOutSvg from '../../assets/imgs/logout.svg'
import { SuperEditableSpan } from '../../SuperComponents/c4-SuperEditableSpan/SuperEditableSpan'
import { makeLogout } from '../auth/auth-slice'
import AvatarLoader from '../avatarLoader/AvatarLoader'
import { BackButton } from '../cards/BackButton/BackButton'

import { selectUser, selectUserAvatar } from './profile-selector'
import { updateUserName } from './profile-slice'
import s from './Profile.module.css'

export const Profile = () => {
  const authIsSignIn = useSelector(selectAuthIsSignin)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const userAvatar = useAppSelector(selectUserAvatar) || avatar

  const userName = user.name == undefined ? user.email : user.name

  const logoutHandler = () => {
    dispatch(makeLogout())
  }

  const handlerUpdateName = (newName: string) => {
    dispatch(updateUserName(newName))
  }

  if (!authIsSignIn) {
    return <Navigate to={'/signin'} />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.backBtn}>
          <BackButton />
        </div>
        <div className={s.profileBlock}>
          <Paper className={s.profile}>
            <h2>Personal Information</h2>
            <img src={userAvatar} alt="avatar for user" className={s.avatar} />
            <SuperEditableSpan value={userName} callback={handlerUpdateName} />
            <div className={s.email}>{user.email}</div>
            <button onClick={logoutHandler} className={s.logOutBtn}>
              <img src={logOutSvg} />
              Log out
            </button>
          </Paper>
        </div>
      </div>
    </div>
  )
}
