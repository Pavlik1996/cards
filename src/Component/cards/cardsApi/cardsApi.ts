import { instance } from '../../../api/api'

export const cardsApi = {
  getCards(
    cardsPack_id: string,
    sort?: number,
    page?: number,
    pageCount: number = 999,
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
  updateCard(id: string, question: string, answer: string) {
    return instance.put<ResponseUpdateCardType>('cards/card', {
      card: { _id: id, question, answer },
    })
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
  packName: string
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

export type ResponseUpdateCardType = {
  updatedCard: CardType
  token: string
  tokenDeathTime: number
}

export type updateCardType = {
  id: string
  question: string
  answer: string
}

export type PutCardType = {
  cardsPack_id: string
  question: string
  answer: string
}
