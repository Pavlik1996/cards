import { instance } from '../../app/api'

export const forgotApi = {
  forgot(data: forgotDataType) {
    return instance.post<ResponseType>('auth/forgot', data)
  },
  newPassword(data: newPasswordDataType) {
    return instance.post('auth/set-new-password', data)
  },
}

type ResponseType = {
  info: string
  error: string
}

export type forgotDataType = {
  email: string
  from: string
  message: string
}

export type newPasswordDataType = {
  password: string
  resetPasswordToken: string
}
