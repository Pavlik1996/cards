import React from 'react'

import Pagination from '@mui/material/Pagination/Pagination'
import Stack from '@mui/material/Stack'

export const PacksPagination: React.FC<PaginationPropsType> = ({
  appStatus,
  page,
  pageCount,
  cardPacksTotalCount,
  onChange,
}) => {
  const lastPage = Math.ceil(cardPacksTotalCount / pageCount)
  const onChangeHandler = (event: any, page: number) => {
    onChange(page, pageCount)
  }

  return (
    <Stack spacing={2} margin={5} alignItems="center">
      <Pagination
        shape="rounded"
        page={page}
        count={lastPage}
        onChange={onChangeHandler}
        disabled={false}
      />
    </Stack>
  )
}

type PaginationPropsType = {
  appStatus?: boolean
  page: number //какая страница кликнута, номер страницы
  pageCount: number //сколько итемсов на странице будет
  cardPacksTotalCount: number //сколько всего паков на бэке
  onChange: (page: number, pageCount: number) => void
}
