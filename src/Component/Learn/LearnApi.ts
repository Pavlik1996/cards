import { instance } from '../../api/api'
import { ResponseGetCardsType, ResponseUpdateCardType } from '../cards/cardsApi/cardsApi'

export const LearnApi = {
  updateRate(_id: string | null, grade: number) {
    return instance.put<ResponseUpdateCardType>('cards/card', { card: { _id, grade } })
  },
  getCards(
    cardsPack_id?: string,
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
}
