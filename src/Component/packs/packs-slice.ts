import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType } from '../../common/types/types'
import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'

import { packsApi } from './packs-api'

const fetchPacks = createAppAsyncThunk<{ cardPacks: CardPacksType[] }, ParamsType>(
  'packs/fetchPacks',
  async (params, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(packsActions.setPacksStatus({ packsStatus: 'loading' }))
      const res = await packsApi.fetchPacks(params)
      const cardPacks = res.cardPacks

      dispatch(
        packsActions.setCardPacksTotalCount({ cardPacksTotalCount: res.cardPacksTotalCount })
      )
      dispatch(packsActions.setPacksStatus({ packsStatus: 'succeeded' }))

      // console.log(res.cardPacks)
      // console.log(res)

      return { cardPacks }
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

    dispatch(packsThunks.fetchPacks({}))
  } catch (e) {
    console.log(e)

    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'packs',
  initialState: {
    packsStatus: 'idle' as RequestStatusType,
    error: null as string | null,
    cardPacks: [] as CardPacksType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    user_id: '642ea45ad9c78e1c8615f2a9',
  },
  reducers: {
    // deletePack: (state, action: PayloadAction<string>) => {
    //   const index = state.cardPacks.findIndex(el => el._id === action.payload)
    //
    //   if (index !== -1) state.cardPacks.splice(index, 1)
    // },
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
    setCardPacksTotalCount: (state, action: PayloadAction<{ cardPacksTotalCount: number }>) => {
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
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
      state.cardPacks = action.payload.cardPacks
    })
  },
})

export const packsSlice = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { fetchPacks, deletePack }

export type CardPacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type ParamsType = {
  cardPacksTotalCount?: number
  maxCardsCount?: number
  minCardsCount?: number
  page?: number
  pageCount?: number
}
// type ParamsType = Partial<_ParamsType>
