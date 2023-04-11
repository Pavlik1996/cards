import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, Paper, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch } from '../../../app/store'
import SuperButton from '../../../SuperComponents/c2-SuperButton/SuperButton'
import { selectAuthIsSignup } from '../auth-selector'
import { authThunks } from '../auth-slice'

import style from './Signup.module.css'

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], "Passwords don't match")
      .required(),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export const Signup = () => {
  const authIsSignup = useSelector(selectAuthIsSignup)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [firstPasswordShown, setFirstPasswordShown] = useState(false)
  const toggleFirstPassword = () => setFirstPasswordShown(!firstPasswordShown)
  const [secondPasswordShown, setSecondPasswordShown] = useState(false)
  const toggleSecondPassword = () => setSecondPasswordShown(!secondPasswordShown)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(authThunks.signup(data))
    reset()
  }

  const onClickHandler = () => {
    console.log('click')
    navigate('/signin')
  }

  if (authIsSignup) {
    return <Navigate to={'/signin'} />
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
          <h1>Sign Up</h1>
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
            <TextField
              {...register('email')}
              label="Email"
              fullWidth
              variant="standard"
              style={{ margin: '24px 0 12px 0' }}
            />
            <div>{errors.email?.message}</div>
            <TextField
              {...register('password')}
              label="Password"
              fullWidth
              variant="standard"
              style={{ margin: '24px 0 12px 0' }}
              type={firstPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleFirstPassword}>
                      {firstPasswordShown ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div>{errors.password?.message}</div>
            <TextField
              {...register('confirmPassword')}
              label="Confirm password"
              fullWidth
              variant="standard"
              style={{ margin: '12px 0 24px 0' }}
              type={secondPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleSecondPassword}>
                      {secondPasswordShown ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div>{errors.confirmPassword?.message}</div>
            <SuperButton type="submit" style={{ width: '100%', margin: '36px 0 0 0' }}>
              Sign Up
            </SuperButton>
          </form>
          <div style={{ margin: '0 0 11px 0' }}>Already have an account?</div>
          <div onClick={onClickHandler} className={style.link}>
            Sign In
          </div>
        </Paper>
      </Box>
    </div>
  )
}
