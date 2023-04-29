import { instance } from '../../api/api'
import { UserType } from '../Profile/profile-slice'

export const authAPI = {
  signin(data: SigninParamsType) {
    return instance.post<ResponseType & UserType>('auth/login', data).then(res => res.data)
  },
  signup(data: SignupParamsType) {
    return instance
      .post<{ addedUser: {}; error?: string }>('auth/register', data)
      .then(res => res.data)
  },
  me() {
    return instance.post<ResponseType>('auth/me', {}).then(res => res.data)
  },
  logout() {
    return instance.delete<{ info: string }>('auth/me').then(res => res.data)
  },
  updateName(name: string) {
    return instance.put<UpdateUserType>('auth/me', { name })
  },
  updateAvatar(avatar: string) {
    return instance.put<UpdateUserType>('auth/me', { avatar })
  },
}

type ResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  avatar?: string
  error?: string
}

export type SigninParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
export type SignupParamsType = {
  email: string
  password: string
}
export type UpdateUserType = {
  token: string
  tokenDeathTime: number
  updatedUser: UserType
}
