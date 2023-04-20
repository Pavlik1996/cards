import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { RootStateType, useAppDispatch } from '../../app/store'
import { selectAuthIsSignin } from '../auth/auth-selector'

import { NewPackModal } from './modals/NewPackModal'
import { PacksPagination } from './packs-pagination/PacksPagination'
import { selectPacks } from './packs-selector'
import { packsThunks } from './packs-slice'
import s from './Packs.module.css'
import { SearchPacksBar } from './search-packs-bar/SearchPacksBar'
import { TableBodyComponent } from './table/table-body/TableBody'
import { TableHeadComponent } from './table/table-head/TableHead'

export const Packs = () => {
  const {
    page,
    pageCount,
    cardPacksTotalCount,
    cardPacks,
    min,
    max,
    packName,
    maxCardsCount,
    sortPacks,
    user_id,
  } = useSelector(selectPacks)
  const user_idAuth = useSelector<RootStateType, string>(state => state.auth.user_id)
  const authIsSignin = useSelector(selectAuthIsSignin)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (authIsSignin) {
      dispatch(packsThunks.fetchPacks())
    }
  }, [page, pageCount, user_id, min, max, packName, sortPacks])

  if (!authIsSignin) {
    return <Navigate to={'/signin'} />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.firstBlock}>
        <h3>Packs list</h3>
        <NewPackModal />
      </div>
      <SearchPacksBar min={min} max={max} maxCardsCount={maxCardsCount} user_id={user_idAuth} />
      {cardPacks.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHeadComponent sort={sortPacks} />
            <TableBodyComponent cardPacks={cardPacks} user_id={user_idAuth} />
          </Table>
        </TableContainer>
      ) : (
        <Typography>Nothing found for your request.</Typography>
      )}
      <PacksPagination
        page={page}
        pageCount={pageCount}
        cardPacksTotalCount={cardPacksTotalCount}
      />
    </div>
  )
}
