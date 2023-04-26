import { RootStateType } from '../../app/store'

export const selectPacks = (state: RootStateType) => state.packs
export const selectPacksStateParams = (state: RootStateType) => state.packsSearchParams
