import { instance } from '../../app/api'

import { ParamsType } from './packs-slice'

export const packsApi = {
  fetchPacks(params: ParamsType) {
    return instance.get<any>('cards/pack', { params: params }).then(res => res.data)
  },
  addPack(data: any) {
    return instance.post<any>('cards/pack', data)
  },
  deletePack(id: string) {
    return instance.delete<any>('cards/pack', { params: { id: id } })
  },
  updatePack(data: any) {
    return instance.put<any>('cards/pack', data)
  },
}

type ResponseType = {}
// packName, min, max, sortPacks, page, pageCount, user_id, block
