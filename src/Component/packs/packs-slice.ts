import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType } from '../../common/types/types'
import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'

import { packsApi } from './packs-api'
import { AddPackDataType, CardPacksType, UpdateParamsType } from './packs-types'

const fetchPacks = createAppAsyncThunk<CardPacksType[], void>(
  'packs/fetchPacks',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const { page, pageCount, min, max, sortPacks, user_id, packName, block } =
      getState().packsSearchParams

    try {
      dispatch(packsActions.setPacksStatus({ packsStatus: 'loading' }))
      const res = await packsApi.fetchPacks({
        page,
        pageCount,
        min,
        max,
        sortPacks,
        user_id,
        packName,
        block,
      })

      const cardPacks = res.cardPacks

      dispatch(
        packsActions.setCardPacksTotalCount({ cardPacksTotalCount: res.cardPacksTotalCount })
      )
      dispatch(packsActions.setMinCardsCount({ minCardsCount: res.minCardsCount }))
      dispatch(packsActions.setMaxCardsCount({ maxCardsCount: res.maxCardsCount }))
      dispatch(packsActions.setPacksStatus({ packsStatus: 'succeeded' }))

      return cardPacks
    } catch (e) {
      console.log(e)

      return rejectWithValue(null)
    }
  }
)
const deletePack = createAppAsyncThunk<void, string>('packs/deletePack', async (id, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    const res = await packsApi.deletePack(id)

    dispatch(packsThunks.fetchPacks())
  } catch (e) {
    console.log(e)

    return rejectWithValue(null)
  }
})
const addPack = createAppAsyncThunk<void, AddPackDataType>(
  'pack/addPack',
  async (newPackData, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      const res = await packsApi.addPack(newPackData)

      dispatch(packsThunks.fetchPacks())
    } catch (e) {
      console.log(e)

      return rejectWithValue(null)
    }
  }
)
const updatePack = createAppAsyncThunk<void, UpdateParamsType>(
  'pack/updatePack',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      const res = await packsApi.updatePack(arg)

      dispatch(packsThunks.fetchPacks())
    } catch (e) {
      console.log(e)

      return rejectWithValue(null)
    }
  }
)

const slice = createSlice({
  name: 'packs',
  initialState: {
    packsStatus: 'idle' as RequestStatusType,
    error: null as string | null,
    cardPacks: [] as CardPacksType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    packId: '',
  },
  reducers: {
    setPackId: (state, action: PayloadAction<{ packId: string }>) => {
      state.packId = action.payload.packId
    },
    setCardPacksTotalCount: (state, action: PayloadAction<{ cardPacksTotalCount: number }>) => {
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
    },
    setMinCardsCount: (state, action: PayloadAction<{ minCardsCount: number }>) => {
      state.minCardsCount = action.payload.minCardsCount
    },
    setMaxCardsCount: (state, action: PayloadAction<{ maxCardsCount: number }>) => {
      state.maxCardsCount = action.payload.maxCardsCount
    },
    setPacksStatus: (state, action: PayloadAction<{ packsStatus: RequestStatusType }>) => {
      state.packsStatus = action.payload.packsStatus
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload
    })
  },
})

export const packsSlice = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { fetchPacks, deletePack, addPack, updatePack }
