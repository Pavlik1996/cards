import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { appActions } from '../../app/app-slice'
import { handleAxiosError } from '../../common/utils/handle-axios-error'
import { authAPI, UserType } from '../auth/auth-api'

import { createAppAsyncThunk } from './../../common/utils/create-app-async-thunk'
import { thunkTryCatch } from '../../common/utils/thunkTryCatch'

const initialState = {
  user: {} as UserType,
}

const updateUserName = createAppAsyncThunk<UserType, { newName: string }>(
  'profile/updateUserName',
  (arg, thunkAPI) => {
    const logic = async () => {
      const user = await authAPI.updateName(arg.newName)
      return user.data.updatedUser
    }
    return thunkTryCatch(thunkAPI, logic)
  }
)

const updateAvatar = createAppAsyncThunk<UserType, { newAvatar: string }>(
  'profile/updateAvatar',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(appActions.setAppStatus({ appStatus: 'loading' }))

      const user = await authAPI.updateAvatar(arg.newAvatar)

      return user.data.updatedUser
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const profileReducer = slice.reducer
export const profileActions = slice.actions
export const profileThunks = { updateUserName, updateAvatar }
