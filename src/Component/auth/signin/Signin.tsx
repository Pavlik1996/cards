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
import { authThunks } from '../auth-slice'

import s from './Signin.module.css'

const style = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > :not(style)': {
      m: 1,
      width: 347,
      height: 557,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: ' 0 33px 35px 33px',
  },
  email: { margin: '24px 0 12px 0' },
  password: { margin: '12px 0 24px 0' },
}

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
    dispatch(authThunks.signin(data))
  }

  const onClickFPWDHandler = () => navigate('/forgotpassword')
  const onClickSUPHandler = () => navigate('/signup')

  if (authIsSignin) {
    return <Navigate to={'/profile'} />
  }

  return (
    <Box sx={style.wrapper}>
      <Paper elevation={3} sx={style.container}>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="Email" variant="standard" {...field} sx={style.email} />
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
                sx={style.password}
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
          <div className={s.rememberMeWrapper}>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <label className={s.label}>
                  <Checkbox {...field} />
                  Remember me
                </label>
              )}
            />
          </div>
          <div className={s.forgotPasswordWrapper}>
            <div className={s.linkFPWD} onClick={onClickFPWDHandler}>
              Forgot Password?
            </div>
          </div>
          <SuperButton type="submit" style={{ width: '100%' }}>
            Sign In
          </SuperButton>
        </form>
        <div>{`Haven't got an account?`}</div>
        <div onClick={onClickSUPHandler} className={s.linkSUP}>
          Sign Up
        </div>
      </Paper>
    </Box>
  )
}
