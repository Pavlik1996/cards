import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
} from '@mui/material'
import Input from '@mui/material/Input'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { RootStateType, useAppDispatch } from '../../../app/store'
import { newPasswordDataType } from '../forgot_api/forgotApi'
import { enterNewPassword } from '../forgot_redux/forgotPassSlice'
import style from '../styles/createnewpassword.module.css'

type FormDataType = {
  password: string
}

export const CreateNewPassword = () => {
  const enterPassword = useSelector<RootStateType, boolean>(
    state => state.forgotPassword.enterPassword
  )
  const progress = useSelector<RootStateType, boolean>(state => state.forgotPassword.progress)

  const dispatch = useAppDispatch()
  const param = useParams<{ id: string }>()

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (data: FormDataType) => {
    if (param.id) {
      const obj: newPasswordDataType = {
        password: data.password,
        resetPasswordToken: param.id,
      }

      dispatch(enterNewPassword(obj))
      reset()
    }
  }

  if (enterPassword) {
    return <Navigate to={'/login'} />
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
        <h2 className={style.title}>Create new password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormGroup>
              <Input
                {...register('password', { required: 'Required' })}
                placeholder={'Password'}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div className={style.errorMessage}>
                {errors?.password && (
                  <p style={{ color: 'red' }}>{errors?.password.message || 'some error'}</p>
                )}
              </div>
              <p className={style.infoText}>
                Create new password and we will send you further instructions to email
              </p>
              <Button className={style.btn} type={'submit'} variant={'contained'}>
                Create new password
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
