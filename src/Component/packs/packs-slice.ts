import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType } from '../../common/types/types'
import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'

import { packsApi } from './packs-api'
import { AddPackDataType, CardPacksType, UpdateParamsType } from './packs-types'

const fetchPacks = createAppAsyncThunk<CardPacksType[], void>(
  'packs/fetchPacks',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const { page, pageCount, min, max, sortPacks, user_id, packName, block } = getState().packs

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
    min: 0,
    max: 0,
    page: 1,
    pageCount: 5,
    user_id: '',
    sortPacks: '',
    packName: '',
    block: false,
  },
  reducers: {
    setSortPacks: (state, action: PayloadAction<{ sortPacks: string }>) => {
      state.sortPacks = action.payload.sortPacks
    },
    setMax: (state, action: PayloadAction<{ max: number }>) => {
      state.max = action.payload.max
    },
    setMin: (state, action: PayloadAction<{ min: number }>) => {
      state.min = action.payload.min
    },
    setUserId: (state, action: PayloadAction<{ user_id: string }>) => {
      state.user_id = action.payload.user_id
    },
    setPackName: (state, action: PayloadAction<{ packName: string }>) => {
      state.packName = action.payload.packName
    },
    setCardPacksTotalCount: (state, action: PayloadAction<{ cardPacksTotalCount: number }>) => {
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
    },
    setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
      state.pageCount = action.payload.pageCount
    },
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page
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
