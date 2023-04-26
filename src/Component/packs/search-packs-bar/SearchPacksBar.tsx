import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useSearchParams } from 'react-router-dom'

import { SearchField } from './search/SearchField'
import s from './SearchPacksBar.module.css'
import { SliderField } from './slider/SliderField'

export const SearchPacksBar: React.FC<SearchPacksBarPropsType> = ({ user_id, ...rest }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  let isMy
  let isAll

  if (searchParams.get('user_id') === null) {
    isMy = false
    isAll = true
  } else if (searchParams.get('user_id') === user_id) {
    isMy = true
    isAll = false
  }

  const showMyPacksHandler = () => {
    const params: { user_id?: string } = {}

    ;['page', 'min', 'max'].forEach(el => searchParams.delete(el))
    params.user_id = user_id

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
    })
  }
  const showAllPacksHandler = () => {
    ;['page', 'min', 'max', 'user_id'].forEach(el => searchParams.delete(el))

    setSearchParams({
      ...Object.fromEntries(searchParams),
    })
  }
  const resetSearchParamsHandler = () => {
    const params = ['page', 'user_id', 'min', 'max', 'sortPacks', 'pageCount', 'packName']

    params.forEach(el => searchParams.delete(el))
    setSearchParams(searchParams)
  }

  return (
    <div className={s.wrapper}>
      <SearchField />
      <div className={s.showPacksWrapper}>
        <h4>Show packs cards</h4>
        <ButtonGroup>
          <Button onClick={showMyPacksHandler} variant={isMy ? 'contained' : 'outlined'}>
            My
          </Button>
          <Button onClick={showAllPacksHandler} variant={isAll ? 'contained' : 'outlined'}>
            All
          </Button>
        </ButtonGroup>
      </div>
      <SliderField min={rest.min} max={rest.max} />
      <div className={s.resetWrapper}>
        <h4>Res</h4>
        <FilterAltOffIcon onClick={resetSearchParamsHandler} color="primary" className={s.reset} />
      </div>
    </div>
  )
}

type SearchPacksBarPropsType = {
  min: number
  max: number
  user_id: string
}
