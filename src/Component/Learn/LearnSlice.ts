import { createSlice } from '@reduxjs/toolkit'

import { appActions } from '../../app/app-slice'
import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'
import { handleAxiosError } from '../../common/utils/handle-axios-error'
import { cardsApi, CardType, ResponseGetCardsType } from '../cards/cardsApi/cardsApi'

const fetchCardsForLearn = createAppAsyncThunk<
  ResponseGetCardsType,
  { cardsPack_id: string | undefined }
>('cards/setCards', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ appStatus: 'loading' }))
    const cards = await cardsApi.getCards({ cardsPack_id: arg.cardsPack_id, pageCount: 999 })

    dispatch(appActions.setAppStatus({ appStatus: 'succeeded' }))

    return cards.data
  } catch (e) {
    handleAxiosError(dispatch, e)

    return rejectWithValue(null)
  }
})

const updateCardForLearn = createAppAsyncThunk<CardType, { _id: string | null; grade: number }>(
  'cards/updateCard',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(appActions.setAppStatus({ appStatus: 'loading' }))

      const card = await cardsApi.updateRate(arg._id, arg.grade)

      dispatch(appActions.setAppStatus({ appStatus: 'succeeded' }))

      return card.data.updatedCard
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)

const slice = createSlice({
  name: 'learn',
  initialState: {} as ResponseGetCardsType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCardsForLearn.fulfilled, (_, action) => {
      return action.payload
    })
  },
})

export const learnReducer = slice.reducer
export const learnThunks = { fetchCardsForLearn, updateCardForLearn }
