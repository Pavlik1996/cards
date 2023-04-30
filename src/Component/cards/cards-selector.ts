import { RootStateType } from '../../app/store'

export const selectorCardsAll = (state: RootStateType) => state.cards
export const selectorPackUserId = (state: RootStateType) => state.cards.packUserId
export const selectorPackName = (state: RootStateType) => state.cards.packName
export const selectorCardsPack_id = (state: RootStateType) => state.packs.packId
