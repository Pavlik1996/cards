import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, FormControl, FormGroup, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { RootStateType, useAppDispatch } from '../../../app/store'
import { forgotDataType } from '../forgot_api/forgotApi'
import { forgotThunks } from '../forgot_redux/forgotPassSlice'
import style from '../styles/forgot.module.css'

const schema = yup
  .object({
    email: yup.string().email().required('Required'),
  })
  .required()

type FormDataType = yup.InferType<typeof schema>

export const ForgotPassword = () => {
  const isForgot = useSelector<RootStateType, boolean>(state => state.forgotPassword.isForgot)
  const progress = useSelector<RootStateType, boolean>(state => state.forgotPassword.progress)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: FormDataType) => {
    const obj: forgotDataType = {
      from: 'admin!',
      email: data.email,
      message:
        '<div style="background-color: lime; padding: 15px">\n' +
        'password recovery link: \n' +
        "<a href='http://localhost:3000/#/set-new-password/$token$'>\n" +
        'link</a>\n' +
        '</div>',
    }

    dispatch(forgotThunks.forgotPassword(obj))
    reset()
  }

  if (isForgot) {
    return <Navigate to={'/checkemail'} />
  }

  if (progress) {
    return (
      <div className={style.wrapper}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={style.wrapper}>
      <div className={style.forgot}>
        <h2 className={style.title}>Forgot your password?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormGroup>
              <TextField
                {...register('email', { required: 'Required' })}
                margin="normal"
                variant="standard"
                placeholder={'Email'}
              />
              <div className={style.errorMessage}>{errors.email?.message}</div>
              <p className={style.infoText}>
                Enter your email address and we will send you further instructions
              </p>
              <Button className={style.btn} type={'submit'} variant={'contained'}>
                Send Instructions
              </Button>
              <div className={style.rememberText}>Did you remember your password?</div>
              <NavLink to={'/login'} style={{ fontSize: '22px' }}>
                Try logging in
              </NavLink>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
