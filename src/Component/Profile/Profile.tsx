import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { selectAuthIsSignin } from '../../app/app-selectors'
import { RootStateType, useAppDispatch, useAppSelector } from '../../app/store'
import arrow from '../../assets/imgs/arrow.svg'
import avatar from '../../assets/imgs/avatarBig.png'
import logout from '../../assets/imgs/logout.svg'
import SuperEditableSpan from '../../SuperComponents/c4-SuperEditableSpan/SuperEditableSpan'
import { makeLogout } from '../auth/auth-slice'
import AvatarLoader from '../avatarLoader/AvatarLoader'

import { updateUserName } from './profile-slice'
import style from './Profile.module.css'

// <SuperEditableSpan value={userName} onChangeText={handlerUpdateName} />

export const Profile = () => {
  const authIsSignin = useSelector(selectAuthIsSignin)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state: RootStateType) => state.profile.user)
  const userAvatar = useAppSelector((state: RootStateType) => state.profile.user.avatar) || avatar

  // const userName = userNameHandler(user.name) == undefined ? user.name : userNameHandler(user.name) //user.name
  const userName = user.name == undefined ? user.email : user.name

  const logoutHandler = () => {
    dispatch(makeLogout())
  }

  const handlerUpdateName = (newName: string) => {
    dispatch(updateUserName(newName))
  }

  const redirectToPacksHandler = () => {
    navigate('/packs')
  }

  if (!authIsSignin) {
    return <Navigate to={'/signin'} />
  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div onClick={redirectToPacksHandler} className={style.linkBackward}>
          <img className={style.arrow} src={arrow} alt="arrow backward" />
          <span className={style.backwardText}>Back to Packs List</span>
        </div>
        <div className={style.profileContainer}>
          <h2 className={style.title}>Personal Information</h2>
          <div className={style.avatarContainer}>
            <div className={style.decoration}>
              <AvatarLoader />
            </div>
            <img src={userAvatar} alt="user avatar" style={{ width: '96px', height: '96px' }} />
          </div>
          <SuperEditableSpan value={userName} callback={handlerUpdateName} />

          <span className={style.emailText}>{user.email}</span>
          <span onClick={logoutHandler} className={style.logOut}>
            <img className={style.logOutIcon} src={logout} alt="button logout" />
            <span className={style.logOutText}>Log out</span>
          </span>
        </div>
      </div>
    </div>
  )
}
