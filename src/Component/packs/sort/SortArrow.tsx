import React from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useSearchParams } from 'react-router-dom'

import s from './SortArrow.module.css'

const pureChange = (sort: string | undefined, down: string, up: string) => {
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
  const [searchParams, setSearchParams] = useSearchParams()
  const up = '0' + value
  const down = '1' + value

  const onChangeSort = (newSort: string) => {
    const params: { sortPacks?: string } = {}

    if (newSort === '') {
      searchParams.delete('sortPacks')
      setSearchParams(searchParams)
    } else {
      params.sortPacks = newSort
    }

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
    })
  }
  const changeSortHandler = () => {
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
    <div onClick={changeSortHandler} className={s.wrapper}>
      {title}
      {icon}
    </div>
  )
}

type SortArrowType = { value: string; sort: string | undefined; title: string }
