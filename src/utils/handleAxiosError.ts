import { Dispatch } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authActions } from '../Component/auth/auth-slice'

export const handleAxiosError = (dispatch: Dispatch, error: AxiosError<ErrorCustomType>) => {
  if (error.response) {
    dispatch(authActions.setError({ error: error.response.data.error }))
  } else {
    dispatch(authActions.setError({ error: error.message }))
  }
  dispatch(authActions.setAuthStatus({ authStatus: 'failed' }))
}

export type ErrorCustomType = {
  error: string
}
