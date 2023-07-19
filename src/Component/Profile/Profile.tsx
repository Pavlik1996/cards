import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'

import { selectAuthIsSignIn } from '../../app/app-selectors'
import { useAppDispatch, useAppSelector } from '../../app/store'
import defaultAvatar from '../../assets/imgs/avatarBig.png'
import cameraLogo from '../../assets/imgs/cameraLogo.svg'
import logOutSvg from '../../assets/imgs/logout.svg'
import { useActions } from '../../common/utils/hooks/useActions'
import { InputTypeFile } from '../../common/utils/InputTypeFIle'
import { SuperEditableSpan } from '../../SuperComponents/c4-SuperEditableSpan/SuperEditableSpan'
import { makeLogout } from '../auth/auth-slice'
import { BackButton } from '../cards/BackButton/BackButton'

import { selectUser } from './profile-selector'
import { profileThunks } from './profile-slice'
import s from './Profile.module.css'

export const Profile = () => {
  const [newAvatar, setNewAvatar] = useState<null | string>(null)
  const authIsSignIn = useAppSelector(selectAuthIsSignIn)
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const { updateUserName, updateAvatar } = useActions(profileThunks)

  const userName = user.name ? user.name : user.email
  const userAvatar = user.avatar

  const logoutHandler = () => {
    dispatch(makeLogout())
  }

  const handlerUpdateName = (newName: string) => {
    if (user.name !== newName) {
      updateUserName({ newName })
    }
  }

  if (!authIsSignIn) {
    return <Navigate to={'/signin'} />
  }

  useEffect(() => {
    if (newAvatar) {
      updateAvatar({ newAvatar: newAvatar })
    }
  }, [newAvatar])

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
              <InputTypeFile setImage={setNewAvatar} />
              <IconButton component="span" className={s.addAvatarIcon}>
                <img src={cameraLogo} alt="camera-logo" />
              </IconButton>
            </label>
            <img src={userAvatar ?? defaultAvatar} alt="avatar" className={s.avatar} />
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
