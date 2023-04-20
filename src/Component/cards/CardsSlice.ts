import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'

import { cardsApi, CardType, ResponseGetCardsType } from './cardsApi/cardsApi'

const fetchCards = createAppAsyncThunk<
  ResponseGetCardsType,
  { cardsPack_id: string; page: number; pageCount: number; searchParam?: string; sort: number }
>('cards/setCards', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    const cards = await cardsApi.getCards(
      arg.sort,
      arg.cardsPack_id,
      arg.page,
      arg.pageCount,
      arg.searchParam
    )

    return cards.data
  } catch (e) {
    return rejectWithValue(null)
  }
})

const addNewCard = createAppAsyncThunk(
  'cards/addnewcard',
  async (arg: { cardsPack_id: string; sort: number }, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const { page, pageCount } = getState().cards

    try {
      const res = await cardsApi.addCard()

      dispatch(
        cardsThunks.fetchCards({
          sort: arg.sort,
          cardsPack_id: arg.cardsPack_id,
          page: page,
          pageCount: pageCount,
        })
      )

      return res.data.newCard
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

const deleteCard = createAppAsyncThunk(
  'cards/deleteCard',
  async (data: { card: CardType; page: number; pageCount: number; sort: number }, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI

    try {
      const res = await cardsApi.deleteCard(data.card._id)

      dispatch(
        cardsThunks.fetchCards({
          sort: data.sort,
          cardsPack_id: data.card.cardsPack_id,
          page: data.page,
          pageCount: data.pageCount,
        })
      )

      return res.data.deletedCard
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

export type updateCardType = {
  id: string
  question: string
}

const updateCard = createAppAsyncThunk(
  'cards/updateCard',
  async (data: updateCardType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      const res = await cardsApi.updateCard(data.id, data.question)

      return res.data.updatedCard
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

const initialState: ResponseGetCardsType = {} as ResponseGetCardsType

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex(el => el._id === action.payload._id)

        state.cards.splice(index, 1)
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.cards.unshift(action.payload)
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const card = state.cards.find(el => el._id === action.payload._id)

        if (card) {
          card.question = action.payload.question
        }
      })
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = { fetchCards, addNewCard, deleteCard, updateCard }
