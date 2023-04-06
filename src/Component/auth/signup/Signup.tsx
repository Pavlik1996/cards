import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Paper, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch } from '../../../app/store'
import SuperButton from '../../../SuperComponents/c2-SuperButton/SuperButton'
import { selectAuthIsSignup } from '../auth-selector'
import { signup } from '../auth-slice'

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
    dispatch(signup(data))
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
            <span className={style.passwordsWrapper}>
              <TextField
                {...register('password')}
                type={firstPasswordShown ? 'text' : 'password'}
                label="Password"
                fullWidth
                variant="standard"
                style={{ margin: '12px 0 24px 0' }}
              />
              <VisibilityIcon onClick={toggleFirstPassword} />
            </span>
            <div>{errors.password?.message}</div>
            <span className={style.passwordsWrapper}>
              <TextField
                {...register('confirmPassword')}
                type={secondPasswordShown ? 'text' : 'password'}
                label="Confirm password"
                fullWidth
                variant="standard"
                style={{ margin: '12px 0 24px 0' }}
              />
              <VisibilityIcon onClick={toggleSecondPassword} />
            </span>
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
