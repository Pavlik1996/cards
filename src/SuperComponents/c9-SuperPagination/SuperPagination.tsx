import React from 'react'

import { Pagination } from '@mui/material'

import SuperSelect from '../c5-SuperSelect/SuperSelect'

import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
  isLoading: boolean
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  isLoading,
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = 'hw15',
}) => {
  // const lastPage = 10 // пишет студент // вычислить количество страниц
  const lastPage = Math.ceil(totalCount / itemsCountForPage) // пишет студент // вычислить количество страниц

  const onChangeCallback = (event: any, page: number) => {
    // пишет студент
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (event: any) => {
    // пишет студент
    onChange(page, event.currentTarget.value)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-pagination'}
        sx={
          {
            // стили для Pagination // пишет студент
          }
        }
        disabled={isLoading}
        color={'primary'}
        shape={'rounded'}
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
      />
      <span className={isLoading ? s.container + ' ' + s.text1 : s.text1}>показать</span>

      <SuperSelect
        id={id + '-pagination-select'}
        value={itemsCountForPage}
        options={[
          { id: 4, value: 4 },
          { id: 7, value: 7 },
          { id: 10, value: 10 },
        ]}
        onChange={onChangeSelect}
        disabled={isLoading}
        className={s.sel}
      />

      <span className={isLoading ? s.container + ' ' + s.text2 : s.text2}>строк в таблице</span>
    </div>
  )
}

export default SuperPagination
