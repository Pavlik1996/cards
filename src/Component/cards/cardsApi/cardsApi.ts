import { instance } from '../../../api/api'

export const cardsApi = {
  getCards(
    sort: number,
    cardsPack_id: string,
    page: number,
    pageCount: number,
    searchParam?: string
  ) {
    return instance.get<ResponseGetCardsType>(
      `cards/card?cardQuestion=${
        searchParam ? searchParam : ''
      }&cardsPack_id=${cardsPack_id}&page=${page}&pageCount=${pageCount}&sortCards=${sort}grade`
    )
  },
  addCard(card: PutCardType) {
    return instance.post<ResponseAddCardType>('cards/card', { card })
  },
  deleteCard(id: string) {
    return instance.delete<ResponseDeleteCardType>(`cards/card?id=${id}`)
  },
  updateCard(id: string, question: string) {
    return instance.put<ResponseUpdateCardType>('cards/card', { card: { _id: id, question } })
  },
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type ResponseGetCardsType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

type ResponseAddCardType = {
  newCard: CardType
  token: string
  tokenDeathTime: number
}

type ResponseDeleteCardType = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}

type ResponseUpdateCardType = {
  updatedCard: CardType
  token: string
  tokenDeathTime: number
}

export type updateCardType = {
  id: string
  question: string
}

export type PutCardType = {
  cardsPack_id: string
  question: string
  answer: string
}
