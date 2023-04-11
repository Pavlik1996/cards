import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { authActions } from '../Component/auth/auth-slice'

export const handleAxiosError = (dispatch: Dispatch, e: unknown) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response ? err.response.data.error : err.message

    dispatch(authActions.setError({ error }))
  } else {
    dispatch(authActions.setError({ error: `Native error ${err.message}` }))
  }
  dispatch(authActions.setAuthStatus({ authStatus: 'failed' }))
}

export type ErrorCustomType = {
  error: string
}
