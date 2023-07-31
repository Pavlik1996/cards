import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { appActions } from '../../app/app-slice'
import { RequestStatusType } from '../../common/types/types'
import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'
import { handleAxiosError } from '../../common/utils/handle-axios-error'
import { profileActions } from '../Profile/profile-slice'

import { authAPI, SignInParamsType, SignupParamsType, UserType } from './auth-api'
import { thunkTryCatch } from '../../common/utils/thunkTryCatch'

const initialized = createAppAsyncThunk<{ isSignIn: boolean }, void>('auth/initialized', async (_, thunkAPI) => {
	const { dispatch } = thunkAPI

	const logic = async () => {
		const res = await authAPI.me()
		dispatch(profileActions.setUser(res))
		return { isSignIn: true }
	}
	return thunkTryCatch(thunkAPI, logic)
})

const signIn = createAppAsyncThunk<{ isSignIn: boolean }, SignInParamsType>(
	'auth/signin',
	async (data: SignInParamsType, thunkAPI) => {
		const { dispatch } = thunkAPI

		const logic = async () => {
			await authAPI.signin(data)
			dispatch(authThunks.initialized())
			return { isSignIn: true }
		}

		return thunkTryCatch(thunkAPI, logic)
	}
)
const signUp = createAppAsyncThunk<{ isSignUp: boolean }, SignupParamsType>(
	'auth/signup',
	async (data: SignupParamsType, thunkAPI) => {
		const logic = async () => {
			await authAPI.signup(data)
			return { isSignUp: true }
		}

		return thunkTryCatch(thunkAPI, logic)
	}
)

const signOut = createAppAsyncThunk<{ isSignIn: boolean }, void>(
	'auth/logout',
	(_, thunkAPI) => {
		const { dispatch } = thunkAPI

		const logic = () => {
			dispatch(profileActions.setUser({} as UserType))
			return { isSignIn: false }
		}
		return thunkTryCatch(thunkAPI, logic)
	}
)

const slice = createSlice({
	name: 'auth',
	initialState: {
		isSignIn: false,
		isSignUp: false,
		isInitialized: false as boolean | undefined,
		error: null as string | null,
		authStatus: 'idle' as RequestStatusType,
		user_id: ''
	},
	reducers: {
		setError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error
		},
		setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
			state.isInitialized = action.payload.isInitialized
		},
	},
	extraReducers: builder => {
		builder
			.addCase(signIn.fulfilled, (state, action) => {
				state.isSignIn = action.payload.isSignIn
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.isSignUp = action.payload.isSignUp
			})
			.addCase(signOut.fulfilled, (state, action) => {
				state.isSignIn = action.payload.isSignIn
			})
			.addCase(initialized.fulfilled, (state, action) => {
				state.isSignIn = action.payload.isSignIn
			})
	}
})

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = { signIn, signUp, initialized, signOut }
