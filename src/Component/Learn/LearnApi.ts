import { instance } from '../../api/api'
import { ResponseUpdateCardType } from '../cards/cardsApi/cardsApi'

export const LearnApi = {
  updateRate(_id: string | undefined, grade: number) {
    return instance.put<ResponseUpdateCardType>('cards/card', { card: { _id, grade } })
  },
}
