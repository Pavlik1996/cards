import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'

import { selectAuthIsSignIn } from '../../app/app-selectors'
import { useAppDispatch, useAppSelector } from '../../app/store'
import avatar from '../../assets/imgs/avatarBig.png'
import cameraLogo from '../../assets/imgs/cameraLogo.svg'
import logOutSvg from '../../assets/imgs/logout.svg'
import { InputTypeFile } from '../../common/utils/InputTypeFIle'
import { SuperEditableSpan } from '../../SuperComponents/c4-SuperEditableSpan/SuperEditableSpan'
import { makeLogout } from '../auth/auth-slice'
import { BackButton } from '../cards/BackButton/BackButton'

import { selectUser, selectUserAvatar } from './profile-selector'
import { updateAvatar, updateUserName } from './profile-slice'
import s from './Profile.module.css'

export const Profile = () => {
  const [baseImg, setBaseImg] = useState('')
  const authIsSignIn = useAppSelector(selectAuthIsSignIn)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const userAvatar = useAppSelector(selectUserAvatar) || avatar

  const userName = user.name == undefined ? user.email : user.name

  const logoutHandler = () => {
    dispatch(makeLogout())
  }

  const handlerUpdateName = (newName: string) => {
    if (user.name !== newName) {
      dispatch(updateUserName(newName))
    }
  }

  if (!authIsSignIn) {
    return <Navigate to={'/signin'} />
  }

  useEffect(() => {
    dispatch(updateAvatar(baseImg))
  }, [baseImg])

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.backBtn}>
          <BackButton />
        </div>
        <div className={s.profileBlock}>
          <Paper className={s.profile}>
            <h2>Personal Information</h2>
            <label className={s.blockChangeAvatar}>
              <InputTypeFile setImage={setBaseImg} />
              <IconButton component="span" className={s.addAvatarIcon}>
                <img src={cameraLogo} alt="camera-logo" />
              </IconButton>
            </label>
            <img src={userAvatar} alt="avatar for user" className={s.avatar} />
            <SuperEditableSpan value={userName} callback={handlerUpdateName} />
            <div className={s.email}>{user.email}</div>
            <button onClick={logoutHandler} className={s.logOutBtn}>
              <img src={logOutSvg} alt={'logo logout'} />
              Log out
            </button>
          </Paper>
        </div>
      </div>
    </div>
  )
}
