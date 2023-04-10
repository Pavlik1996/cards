import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Checkbox, IconButton, InputAdornment, Paper, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'
import SuperButton from '../../../SuperComponents/c2-SuperButton/SuperButton'
import { SigninParamsType } from '../auth-api'
import { selectAuthIsSignin } from '../auth-selector'
import { signin } from '../auth-slice'

import style from './Signin.module.css'

export const Signin = () => {
  const authIsSignin = useSelector(selectAuthIsSignin)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => setPasswordShown(!passwordShown)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  const onSubmit: SubmitHandler<SigninParamsType> = data => {
    dispatch(signin(data))
  }

  const onClickFPWDHandler = () => navigate('/forgotpassword')
  const onClickSUPHandler = () => navigate('/signup')

  if (authIsSignin) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 347,
            height: 557,
          },
        }}
      >
        <Paper
          elevation={3}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: ' 0 33px 35px 33px',
          }}
        >
          <h1>Sign in</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '16px',
              marginBottom: '31px',
            }}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Email"
                  variant="standard"
                  {...field}
                  style={{ margin: '24px 0 12px 0' }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Password"
                  type={passwordShown ? 'text' : 'password'}
                  variant="standard"
                  {...field}
                  style={{ margin: '12px 0 24px 0' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePassword}>
                          {passwordShown ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <div className={style.rememberMeWrapper}>
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <label style={{ margin: '0px 0 28px 0' }}>
                    <Checkbox {...field} />
                    Remember me
                  </label>
                )}
              />
            </div>
            <div className={style.forgotPasswordWrapper}>
              <div className={style.linkFPWD} onClick={onClickFPWDHandler}>
                Forgot Password?
              </div>
            </div>
            <SuperButton type="submit" style={{ width: '100%' }}>
              Sign In
            </SuperButton>
          </form>
          <div style={{ margin: '0 0 11px 0' }}>Already have an account?</div>
          <div onClick={onClickSUPHandler} className={style.linkSUP}>
            Sign Up
          </div>
        </Paper>
      </Box>
    </div>
  )
}
