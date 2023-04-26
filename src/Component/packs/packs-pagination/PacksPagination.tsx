import React, { ChangeEvent, useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination/Pagination'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useSearchParams } from 'react-router-dom'

import s from './PacksPagination.module.css'

export const PacksPagination: React.FC<PaginationPropsType> = ({
  pageCountState,
  cardPacksTotalCount,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [pageCount, setPageCount] = useState<number>(
    Number(searchParams.get('pageCount')) || pageCountState //5
  )

  const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1)

  const lastPage = Math.ceil(cardPacksTotalCount / pageCount)

  const changePageLHandler = (event: ChangeEvent<unknown>, page: number) => {
    const params: { page?: string } = {}

    if (page !== 1) {
      params.page = String(page)
    } else {
      searchParams.delete('page')
      setSearchParams(searchParams)
    }

    setPage(page)

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
    })
  }
  const changePageCountHandler = (event: SelectChangeEvent<number>) => {
    const params: { pageCount?: string } = {}

    params.pageCount = String(event.target.value)
    setPageCount(+event.target.value)
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
    })
  }

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1)
  }, [searchParams])

  return (
    <div className={s.paginationWrapper}>
      <Pagination shape="rounded" page={page} count={lastPage} onChange={changePageLHandler} />
      <span>Show</span>
      <Select
        className={s.select}
        size="small"
        value={pageCount}
        onChange={changePageCountHandler}
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
  pageCountState: any //сколько итемсов на странице будет
  cardPacksTotalCount: number //сколько всего паков на бэке
}
