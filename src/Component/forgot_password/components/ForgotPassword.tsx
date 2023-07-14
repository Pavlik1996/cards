import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, FormControl, FormGroup, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { forgotDataType } from '../forgot_api/forgotApi'
import { isForgotSelect, progressForgotSelect } from '../forgot_redux/forgot-selectors'
import { forgotThunks } from '../forgot_redux/forgotPassSlice'
import s from '../styles/forgot.module.css'

const schema = yup
  .object({
    email: yup.string().email().required('Required'),
  })
  .required()

type FormDataType = yup.InferType<typeof schema>

export const ForgotPassword = () => {
  const isForgot = useAppSelector(isForgotSelect)
  const progress = useAppSelector(progressForgotSelect)
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
      <div className={s.wrapper}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <div className={s.forgot}>
        <h2 className={s.title}>Forgot your password?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormGroup>
              <TextField
                {...register('email', { required: 'Required' })}
                margin="normal"
                variant="standard"
                placeholder={'Email'}
              />
              <div className={s.errorMessage}>{errors.email?.message}</div>
              <p className={s.infoText}>
                Enter your email address and we will send you further instructions
              </p>
              <Button className={s.btn} type={'submit'} variant={'contained'}>
                Send Instructions
              </Button>
              <span className={s.rememberText}>Did you remember your password?</span>
              <Link to={'/login'}>Try logging in</Link>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
