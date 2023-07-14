import { RootStateType } from '../../app/store'

export const selectUserId = (state: RootStateType) => state.profile.user._id
export const selectUser = (state: RootStateType) => state.profile.user
export const selectUserAvatar = (state: RootStateType) => state.profile.user.avatar
