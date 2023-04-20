import { ChangeEvent, useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {
  Button,
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
import { useNavigate } from 'react-router-dom'

import { RootStateType, useAppDispatch } from '../../app/store'
import useDebounce from '../../hooks/useDebounce'
import SuperPagination from '../../SuperComponents/c9-SuperPagination/SuperPagination'

import { Card } from './Card'
import { ResponseGetCardsType } from './cardsApi/cardsApi'
import style from './CardsList.module.css'
import { cardsThunks } from './CardsSlice'

export const CardsList = () => {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(4)
  const [value, setValue] = useState('')
  const [sort, setSort] = useState(false)
  const searchParam = useDebounce<string>(value)

  const cards = useSelector<RootStateType, ResponseGetCardsType>(state => state.cards)
  const cardsPack_id = useSelector<RootStateType, string>(state => state.packs.packId)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setPageCount(newCount)
  }

  const onClickAddCardHandler = () => {
    dispatch(cardsThunks.addNewCard({ cardsPack_id, sort: !sort ? 0 : 1 }))
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    dispatch(
      cardsThunks.fetchCards({ cardsPack_id, page, pageCount, searchParam, sort: !sort ? 0 : 1 })
    )
  }, [page, pageCount, searchParam, sort])

  const onClickHandler = () => {
    setSort(!sort)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.back}>
        <KeyboardBackspaceIcon />
        <span
          onClick={() => {
            navigate('/packs')
          }}
        >
          Back to Packs List
        </span>
      </div>
      <div className={style.packButton}>
        <h2>Friends Pack</h2>
        <Button variant={'contained'} className={style.btn} onClick={onClickAddCardHandler}>
          Add New Card
        </Button>
      </div>
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
                <TableCell />
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
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <SuperPagination
        page={page}
        onChange={onChangePagination}
        totalCount={cards.cardsTotalCount}
        itemsCountForPage={pageCount}
      />
    </div>
  )
}
