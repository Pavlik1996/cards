import React, { useState } from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { Button, ButtonGroup } from '@mui/material'

import { useAppDispatch } from '../../../app/store'
import { packsActions } from '../packs-slice'

import { SearchField } from './search/SearchField'
import s from './SearchPacksBar.module.css'
import { SliderField } from './slider/SliderField'

export const SearchPacksBar: React.FC<SearchPacksBarPropsType> = props => {
  const { maxCardsCount, user_id, ...rest } = props
  const dispatch = useAppDispatch()
  const [isMyPack, setIsMyPack] = useState(false)

  const showMyPacksHandler = () => {
    setIsMyPack(true)
    dispatch(packsActions.setUserId({ user_id }))
  }
  const showAllPacksHandler = () => {
    setIsMyPack(false)
    dispatch(packsActions.setUserId({ user_id: '' }))
  }
  const resetParamsHandler = () => {
    dispatch(packsActions.setPage({ page: 1 }))
    dispatch(packsActions.setPackName({ packName: '' }))
    dispatch(packsActions.setMin({ min: 0 }))
    dispatch(packsActions.setMax({ max: maxCardsCount }))
    dispatch(packsActions.setSortPacks({ sortPacks: '' }))
  }

  return (
    <div className={s.wrapper}>
      <SearchField />
      <div className={s.showPacksWrapper}>
        <h4>Show packs cards</h4>
        <ButtonGroup>
          <Button onClick={showMyPacksHandler} variant={isMyPack ? 'contained' : 'outlined'}>
            My
          </Button>
          <Button onClick={showAllPacksHandler} variant={!isMyPack ? 'contained' : 'outlined'}>
            All
          </Button>
        </ButtonGroup>
      </div>
      <SliderField min={rest.min} max={rest.max} />
      <div className={s.resetWrapper}>
        <h4>Res</h4>
        <FilterAltOffIcon onClick={resetParamsHandler} color="primary" className={s.reset} />
      </div>
    </div>
  )
}

type SearchPacksBarPropsType = {
  min: number
  max: number
  maxCardsCount: number
  user_id: string
}
