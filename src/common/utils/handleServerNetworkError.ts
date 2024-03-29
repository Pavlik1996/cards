import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { appActions } from '../../app/app-slice';

/**
 * Обрабатывает ошибки сети, возникающие при отправке запросов на сервер
 * @param {unknown} e - Ошибка, которая произошла при отправке запроса на сервер
 * @param {Dispatch} dispatch - Функция dispatch из библиотеки Redux для отправки actions
 * @returns {void}
 */
export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : 'Some error occurred'
    dispatch(appActions.setError({ error }))
  } else {
    dispatch(appActions.setError({ error: `Native error ${err.message}` }))
  }
}
