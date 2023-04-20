export type AddPackDataType = {
  cardsPack: {
    packName: string
    private?: boolean
    deckCover?: string
  }
  min?: number
  max?: number
}
export type FetchResponseType = {
  cardPacks: CardPacksType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type CardPacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
export type FetchParamsType = {
  packName?: string
  page?: number
  pageCount?: number | null
  min?: number
  max?: number
  sortPacks?: string
  user_id?: string
  block?: boolean
}
export type UpdateParamsType = {
  cardsPack: {
    _id: string
    name?: string
    deckCover?: string
    private?: boolean
  }
}
