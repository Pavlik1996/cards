import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AppDispatch, RootStateType } from '../../app/store';
import { appActions } from '../../app/app-slice';
import { handleServerNetworkError } from './handleServerNetworkError';


export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootStateType, any, AppDispatch, null>, logic: Function) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ appStatus: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppStatus({ appStatus: 'idle' }))
  }
}