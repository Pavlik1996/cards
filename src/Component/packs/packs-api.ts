import { instance } from '../../api/api'

import {
  FetchParamsType,
  AddPackDataType,
  FetchResponseType,
  UpdateParamsType,
} from './packs-types'

export const packsApi = {
  fetchPacks(params: FetchParamsType) {
    return instance.get<FetchResponseType>('cards/pack', { params: params }).then(res => res.data)
  },
  addPack(data: AddPackDataType) {
    return instance.post<any>('cards/pack', data)
  },
  deletePack(id: string) {
    return instance.delete<any>('cards/pack', { params: { id: id } })
  },
  updatePack(data: UpdateParamsType) {
    return instance.put<any>('cards/pack', data)
  },
}
