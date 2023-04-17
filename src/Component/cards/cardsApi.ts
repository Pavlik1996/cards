import { instance } from '../../app/api'
const card = { cardsPack_id: '64399f410e0a7c04985eef42' }

export const cardsApi = {
  getCards(cardsPack_id: string) {
    return instance.get<ResponseGetType>(`cards/card?cardsPack_id=${cardsPack_id}`)
  },
  addCard() {
    return instance.post<ResponseAddCardType>('cards/card', { card })
  },
  deleteCard(id: string) {
    return instance.delete<ResponseDeleteCardType>(`cards/card?${id}`)
  },
  updateCard(id: string) {
    return instance.put<ResponseUpdateCardType>('cards/card', { id })
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

type ResponseGetType = {
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
