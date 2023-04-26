import { ChangeEvent, useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { RootStateType, useAppDispatch } from '../../app/store'
import { useDebounce } from '../../common/utils/hooks/useDebounce'
import SuperPagination from '../../SuperComponents/c9-SuperPagination/SuperPagination'

import { BackButton } from './BackButton/BackButton'
import { Card } from './Card'
import { selectorCardsAll } from './cards-selector'
import style from './CardsList.module.css'
import { cardsThunks } from './CardsSlice'
import { sortEnums } from './enums/cards-enums'
import { ButtonAddNewCard } from './modalsCards/ButtonAddNewCard/ButtonAddNewCard'

export const CardsList = () => {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(4)
  const [value, setValue] = useState('')
  const [sort, setSort] = useState(false)
  const searchParam = useDebounce<string>(value)
  const [searchParams, setSearchParams] = useSearchParams()

  const cards = useSelector(selectorCardsAll)
  const cardsPack_id = useSelector<RootStateType, string>(state => state.packs.packId)
  const dispatch = useAppDispatch()

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setPageCount(newCount)
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    dispatch(
      cardsThunks.fetchCards({
        cardsPack_id,
        page,
        pageCount,
        searchParam,
        sort: sort ? sortEnums.up : sortEnums.down,
      })
    )
  }, [page, pageCount, searchParam, sort])

  const onClickHandler = () => {
    setSort(!sort)
  }

  return (
    <div className={style.wrapper}>
      <BackButton dispatch={dispatch} />
      <ButtonAddNewCard dispatch={dispatch} sort={sort} />
      <div style={{ textAlign: 'start' }}>Search</div>
      <TextField sx={{ width: '100%' }} value={value} onChange={handleChange} />
      <div className={style.container}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className={style.tableHead}>
              <TableRow>
                <TableCell align="left">
                  <b>Question</b>
                </TableCell>
                <TableCell align="left">
                  <b>Answer</b>
                </TableCell>
                <TableCell align="left">
                  <label onClick={onClickHandler}>
                    <b>Last Updated</b>
                    <span>{!sort ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                  </label>
                </TableCell>
                <TableCell align="left">
                  <b>Grade</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.cards?.map(el => (
                <Card
                  card={el}
                  key={el._id}
                  page={page}
                  pageCount={pageCount}
                  sort={!sort ? 0 : 1}
                  dispatch={dispatch}
                  cardsPack_id={cardsPack_id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <SuperPagination
          page={page}
          onChange={onChangePagination}
          totalCount={cards.cardsTotalCount}
          itemsCountForPage={pageCount}
        />
      </div>
    </div>
  )
}
