import { RootStateType } from '../../app/store'

export const selectUserId = (state: RootStateType) => state.profile.user._id
