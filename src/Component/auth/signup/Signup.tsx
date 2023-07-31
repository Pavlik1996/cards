import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import * as yup from 'yup'

import { useActions } from '../../../common/utils/hooks/useActions'
import { selectAuthIsSignUp } from '../auth-selector'
import { authThunks } from '../auth-slice'

import s from './Signup.module.css'

const style = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > :not(style)': {
      m: 1,
      width: 413,
      height: 528,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: ' 0 33px 35px 33px',
  },
  email: { margin: '24px 0 12px 0' },
  password: { margin: '12px 0 12px 0' },
  confPass: { margin: '12px 0 24px 0' },
}

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
  const authIsSignup = useSelector(selectAuthIsSignUp)
  const { signUp } = useActions(authThunks)

  const [firstPasswordShown, setFirstPasswordShown] = useState(false)
  const [secondPasswordShown, setSecondPasswordShown] = useState(false)

  const toggleFirstPassword = () => setFirstPasswordShown(!firstPasswordShown)
  const toggleSecondPassword = () => setSecondPasswordShown(!secondPasswordShown)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => {
    signUp(data)
  }

  if (authIsSignup) {
    return <Navigate to={'/signin'} />
  }

  return (
    <Box sx={style.wrapper}>
      <Paper elevation={3} sx={style.container}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
          <TextField
            {...register('email')}
            label="Email"
            fullWidth
            variant="standard"
            sx={style.email}
          />
          <div>{errors.email?.message}</div>
          <TextField
            {...register('password')}
            label="Password"
            fullWidth
            variant="standard"
            sx={style.password}
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
            sx={style.confPass}
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
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 5 }}>
            Sign Up
          </Button>
        </form>
        <span className={s.textSignUp}>Already have an account?</span>
        <Link to={'/signin'}>Sign In</Link>
      </Paper>
    </Box>
  )
}
