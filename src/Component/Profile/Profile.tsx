import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { selectAuthIsSignin } from '../../app/app-selectors'

export const Profile = () => {
  const authIsSignin = useSelector(selectAuthIsSignin)

  if (!authIsSignin) {
    return <Navigate to={'/signup'} />
  }

  return <div>Profile</div>
}
