import React, { ChangeEvent, useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { MenuItem, SelectChangeEvent } from '@mui/material'
import Pagination from '@mui/material/Pagination/Pagination'
import Select from '@mui/material/Select/Select'

import { useAppDispatch } from '../../../app/store'
import { packsActions } from '../packs-slice'

import s from './PacksPagination.module.css'

export const PacksPagination: React.FC<PaginationPropsType> = ({
  appStatus,
  page,
  pageCount,
  cardPacksTotalCount,
}) => {
  const dispatch = useAppDispatch()
  const lastPage = Math.ceil(cardPacksTotalCount / pageCount)

  const [pageCountValue, setPageCountValue] = useState<number>(pageCount)
  const [pageValue, setPageValue] = useState<number>(page)

  const onChangePagination = (event: ChangeEvent<unknown>, page: number) => {
    setPageValue(page)
  }
  const onChangePageValue = (event: SelectChangeEvent<number>) => {
    setPageCountValue(+event.target.value)
  }

  useEffect(() => {
    dispatch(packsActions.setPage({ page: pageValue }))
    dispatch(packsActions.setPageCount({ pageCount: pageCountValue }))
  }, [pageValue, pageCountValue])

  return (
    <div className={s.paginationWrapper}>
      <Pagination shape="rounded" page={pageValue} count={lastPage} onChange={onChangePagination} />
      <span>Show</span>
      <Select
        className={s.select}
        size="small"
        value={pageCountValue}
        onChange={onChangePageValue}
        IconComponent={KeyboardArrowDownIcon}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
      <span>Packs per Page</span>
    </div>
  )
}

type PaginationPropsType = {
  appStatus?: boolean
  page: number //какая страница кликнута, номер страницы
  pageCount: number //сколько итемсов на странице будет
  cardPacksTotalCount: number //сколько всего паков на бэке
}
