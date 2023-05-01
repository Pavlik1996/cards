import { RootStateType } from '../../app/store'

export const selectorCards = (state: RootStateType) => state.learn
export const selectorNameCard = (state: RootStateType) => state.learn.packName
