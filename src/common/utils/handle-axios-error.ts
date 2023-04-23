import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { appActions } from '../../app/app-slice'

export const handleAxiosError = (dispatch: Dispatch, e: unknown) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response ? err.response.data.error : err.message

    dispatch(appActions.setError({ error }))
  } else {
    dispatch(appActions.setError({ error: `Native error ${err.message}` }))
  }
  dispatch(appActions.setAppStatus({ appStatus: 'failed' }))
}

export type ErrorCustomType = {
  error: string
}
