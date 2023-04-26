import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FetchParamsType } from './packs-types'

const slice = createSlice({
  name: 'packsSearchParams',
  initialState: {
    min: undefined,
    max: undefined,
    page: undefined,
    pageCount: 5,
    user_id: undefined,
    sortPacks: undefined,
    packName: undefined,
    block: undefined,
  } as FetchParamsType,
  reducers: {
    setSearchingParams: (state, action: PayloadAction<{ params: FetchParamsType }>) => {
      state.max = action.payload.params.max
      state.min = action.payload.params.min
      state.page = action.payload.params.page
      state.pageCount = action.payload.params.pageCount
      state.user_id = action.payload.params.user_id
      state.sortPacks = action.payload.params.sortPacks
      state.packName = action.payload.params.packName
      state.block = action.payload.params.block
    },
  },
  extraReducers: {},
})

export const packsSearchParamsSlice = slice.reducer
export const searchParamsActions = slice.actions
