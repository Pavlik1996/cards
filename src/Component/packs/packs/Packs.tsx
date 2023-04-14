import React, { useEffect } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolIcon from '@mui/icons-material/School'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { RootStateType, useAppDispatch } from '../../../app/store'
import { CardPacksType, packsThunks } from '../packs-slice'

import { PacksPagination } from './PacksPagination'
import { SearchPacksBar } from './SearchPacksBar'

export const Packs = () => {
  const page = useSelector<RootStateType, number>(state => state.packs.page)
  const pageCount = useSelector<RootStateType, number>(state => state.packs.pageCount)
  const cardPacksTotalCount = useSelector<RootStateType, number>(
    state => state.packs.cardPacksTotalCount
  )
  const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.packs.cardPacks)
  const userId = useSelector<RootStateType, string>(state => state.auth.user_id)
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  // const params = { page, pageCount }

  const onChangePagination = (page: number, pageCount: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
      pageCount: pageCount.toString(),
    })
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    dispatch(packsThunks.fetchPacks(params))
    // dispatch(packsThunks.fetchPacks({ page, pageCount }))
  }, [])

  return (
    <div>
      <h1>Packs</h1>
      <Button
        onClick={() => {
          alert('add new pack')
        }}
        variant="contained"
      >
        Add new pack
      </Button>
      <SearchPacksBar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cards</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardPacks.map((el: CardPacksType) => {
              const data = new Date(el.updated)
              const formatedDate = new Intl.DateTimeFormat(['ru']).format(data)

              return (
                <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {el.name}
                  </TableCell>
                  <TableCell>{el.cardsCount}</TableCell>
                  <TableCell>{formatedDate}</TableCell>
                  <TableCell>{el.user_name}</TableCell>
                  <TableCell>
                    {userId === el.user_id ? (
                      <span>
                        <SchoolIcon
                          onClick={() => {
                            alert('start studing')
                          }}
                        />
                        <BorderColorIcon
                          onClick={() => {
                            alert('edit this pack')
                          }}
                        />
                        <DeleteOutlineIcon
                          onClick={() => {
                            dispatch(packsThunks.deletePack(el._id))
                          }}
                        />
                      </span>
                    ) : (
                      <SchoolIcon
                        onClick={() => {
                          alert('start studying')
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PacksPagination
        page={page}
        pageCount={pageCount}
        cardPacksTotalCount={cardPacksTotalCount}
        onChange={onChangePagination}
      />
    </div>
  )
}
