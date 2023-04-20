import React from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { useAppDispatch } from '../../../app/store'
import { packsActions } from '../packs-slice'

import s from './SortArrow.module.css'

const pureChange = (sort: string, down: string, up: string) => {
  if (sort === '') {
    return down
  } else if (sort === down) {
    return up
  } else if (sort === up) {
    return ''
  } else {
    return down
  }
}

export const SortArrow: React.FC<SortArrowType> = ({ value, sort, title }) => {
  const dispatch = useAppDispatch()
  const up = '0' + value
  const down = '1' + value
  const onChangeSort = (newSort: string) => {
    dispatch(packsActions.setSortPacks({ sortPacks: newSort }))
  }
  const onClickHandler = () => {
    onChangeSort(pureChange(sort, down, up))
  }
  let icon

  if (sort === down) {
    icon = <KeyboardArrowDownIcon />
  } else if (sort === up) {
    icon = <KeyboardArrowUpIcon />
  } else {
    icon = ''
  }

  return (
    <div onClick={onClickHandler} className={s.wrapper}>
      {title}
      {icon}
    </div>
  )
}

type SortArrowType = { value: string; sort: string; title: string }
