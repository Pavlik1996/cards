import { createSlice } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'
import { handleAxiosError } from '../../common/utils/handle-axios-error'

import { cardsApi, CardType, ResponseGetCardsType, updateCardType } from './cardsApi/cardsApi'

const fetchCards = createAppAsyncThunk<
  ResponseGetCardsType,
  {
    cardsPack_id: string | undefined
    page?: number
    pageCount?: number
    searchParam?: string
    sort?: number
  }
>('cards/setCards', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    const cards = await cardsApi.getCards({
      pageCount: arg.pageCount,
      page: arg.page,
      sort: arg.sort,
      cardsPack_id: arg.cardsPack_id,
      searchParam: arg.searchParam,
    })

    return cards.data
  } catch (e) {
    handleAxiosError(dispatch, e)

    return rejectWithValue(null)
  }
})

const addNewCard = createAppAsyncThunk(
  'cards/addnewcard',
  async (
    arg: {
      sort: number
      answer: string
      question: string
      questionImg: string
      cardsPack_id: string | undefined
    },
    thunkAPI
  ) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const { page, pageCount } = getState().cards

    try {
      await cardsApi.addCard({
        cardsPack_id: arg.cardsPack_id,
        answer: arg.answer,
        question: arg.question,
        questionImg: arg.questionImg,
      })

      dispatch(
        cardsThunks.fetchCards({
          sort: arg.sort,
          cardsPack_id: arg.cardsPack_id,
          page: page,
          pageCount: pageCount,
        })
      )
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)

const deleteCard = createAppAsyncThunk(
  'cards/deleteCard',
  async (data: { card: CardType; page: number; pageCount: number; sort: number }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      await cardsApi.deleteCard(data.card._id)

      dispatch(
        cardsThunks.fetchCards({
          sort: data.sort,
          cardsPack_id: data.card.cardsPack_id,
          page: data.page,
          pageCount: data.pageCount,
        })
      )
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)

const updateCard = createAppAsyncThunk(
  'cards/updateCard',
  async (data: updateCardType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      const res = await cardsApi.updateCard(data.id, data.question, data.answer, data.questionImg)

      return res.data.updatedCard
    } catch (e) {
      handleAxiosError(dispatch, e)

      return rejectWithValue(null)
    }
  }
)

const initialState: ResponseGetCardsType = {} as ResponseGetCardsType

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    resetSlice: () => {
      return {} as ResponseGetCardsType
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCards.fulfilled, (_, action) => {
        return action.payload
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const card = state.cards.find(el => el._id === action.payload._id)

        if (card) {
          card.question = action.payload.question
          card.answer = action.payload.answer
          card.questionImg = action.payload.questionImg
        }
      })
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = { fetchCards, addNewCard, deleteCard, updateCard }
