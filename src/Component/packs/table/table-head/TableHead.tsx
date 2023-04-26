import React from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { SortArrow } from '../../sort/SortArrow'

import { tableHeadData } from './TableHeadData'

const style = {
  wrapper: {
    background: '#EFEFEF',
  },
}

export const TableHeadComponent: React.FC<TableHeadComponentType> = ({ sort }) => {
  return (
    <TableHead sx={style.wrapper}>
      <TableRow>
        {tableHeadData.map(el => {
          return (
            <TableCell key={el.id} align="left" width={el.size}>
              {el.isSortable ? (
                <SortArrow title={el.label} value={el.id} sort={sort} />
              ) : (
                <span>{el.label}</span>
              )}
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

type TableHeadComponentType = { sort: string | undefined }
