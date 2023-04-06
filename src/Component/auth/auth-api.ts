import { instance } from '../../app/api'

export const authAPI = {
  signin(data: SigninParamsType) {
    return instance.post<ResponseType>('auth/login', data).then(res => res.data)
  },
  signup(data: SignupParamsType) {
    return instance
      .post<{ addedUser: {}; error?: string }>('auth/register', data)
      .then(res => res.data)
  },
  me() {
    return instance.post<ResponseType>('auth/me', {}).then(res => res.data)
  },
}

export type ResponseType = {
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
