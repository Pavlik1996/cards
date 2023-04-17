import { createSlice } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '../../utils/create-app-async-thunk'

import { cardsApi, CardType } from './cardsApi'

const fetchCards = createAppAsyncThunk('cards/setCards', async (cardsPack_id: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    const cards = await cardsApi.getCards(cardsPack_id)

    return cards.data.cards
  } catch (e) {
    return rejectWithValue(null)
  }
})

const addNewCard = createAppAsyncThunk('cards/addnewcard', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    const res = await cardsApi.addCard()

    return res.data.newCard
  } catch (e) {
    return rejectWithValue(null)
  }
})

const initialState: CardType[] = [] as CardType[]

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = { fetchCards, addNewCard }
