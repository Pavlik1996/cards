import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import { useActions } from '../../common/utils/hooks/useActions'
import { selectAuthIsSignin, selectAuthUserId } from '../auth/auth-selector'

import { AddPackModal } from './modals/add-modal/AddPackModal'
import { PacksPagination } from './packs-pagination/PacksPagination'
import { searchParamsActions } from './packs-search-params-slice'
import { selectPacks, selectPacksStateParams } from './packs-selector'
import { packsThunks } from './packs-slice'
import { FetchParamsType } from './packs-types'
import s from './Packs.module.css'
import { SearchPacksBar } from './search-packs-bar/SearchPacksBar'
import { TableBodyComponent } from './table/table-body/TableBody'
import { TableHeadComponent } from './table/table-head/TableHead'

export const Packs = () => {
  const { cardPacksTotalCount, cardPacks, minCardsCount, maxCardsCount } = useSelector(selectPacks)
  const user_idAuth = useSelector(selectAuthUserId)
  const authIsSignin = useSelector(selectAuthIsSignin)
  const stateParams = useSelector(selectPacksStateParams)

  const { setSearchingParams } = useActions(searchParamsActions)
  const { fetchPacks } = useActions(packsThunks)

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const URLParams: FetchParamsType = {
    min: Number(searchParams.get('min')) || undefined,
    max: Number(searchParams.get('max')) || undefined,
    page: Number(searchParams.get('page')) || undefined,
    pageCount: Number(searchParams.get('pageCount')) || 5,
    user_id: searchParams.get('user_id') || undefined,
    sortPacks: searchParams.get('sortPacks') || undefined,
    packName: searchParams.get('packName') || undefined,
    block: Boolean(searchParams.get('block')) || undefined,
  }

  useEffect(() => {
    if (JSON.stringify(stateParams) !== JSON.stringify(URLParams))
      setSearchingParams({ params: URLParams })
  }, [URLParams])

  useEffect(() => {
    if (JSON.stringify(stateParams) === JSON.stringify(URLParams))
      if (authIsSignin) {
        fetchPacks({})
      }
  }, [stateParams])

  if (!authIsSignin) {
    return <Navigate to={'/signin'} />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.firstBlock}>
        <h3>Packs list</h3>
        <AddPackModal />
      </div>
      <SearchPacksBar min={minCardsCount} max={maxCardsCount} user_id={user_idAuth} />
      {cardPacks.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHeadComponent sort={stateParams.sortPacks} />
            <TableBodyComponent cardPacks={cardPacks} user_id={user_idAuth} />
          </Table>
        </TableContainer>
      ) : (
        <Typography>Nothing found for your request.</Typography>
      )}
      <PacksPagination
        pageCountState={stateParams.pageCount}
        cardPacksTotalCount={cardPacksTotalCount}
      />
    </div>
  )
}
