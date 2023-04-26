import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { selectAuthIsSignin } from '../../app/app-selectors'

export const Profile = () => {
  const authIsSignin = useSelector(selectAuthIsSignin)

  const navigate = useNavigate()

  if (!authIsSignin) {
    return <Navigate to={'/signup'} />
  }

  return (
    <>
      <h1>Profile</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
      >
        <h2
          onClick={() => navigate('/packs')}
          style={{ border: '1px solid red', marginBottom: '20px' }}
        >
          packs
        </h2>
        <h2 onClick={() => navigate('/tablecards')} style={{ border: '1px solid red' }}>
          cards
        </h2>
      </div>
    </>
  )
}
