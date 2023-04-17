import { useEffect, useState } from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {
  Button,
  Pagination,
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

import { RootStateType, useAppDispatch } from '../../app/store'
import SuperSelect from '../../SuperComponents/c5-SuperSelect/SuperSelect'

import { Card } from './Card'
import { CardType } from './cardsApi'
import style from './CardsList.module.css'
import { cardsThunks } from './CardsSlice'

export const CardsList = () => {
  const cardsPack_id = '64399f410e0a7c04985eef42'
  const cards = useSelector<RootStateType, CardType[]>(state => state.cards)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(cardsThunks.fetchCards(cardsPack_id))
  }, [])

  const onClickHandler = () => {
    dispatch(cardsThunks.addNewCard())
  }

  return (
    <div className={style.wrapper}>
      <div className={style.back}>
        <KeyboardBackspaceIcon />
        <span>Back to Packs List</span>
      </div>
      <div className={style.packButton}>
        <h2>Friends Pack</h2>
        <Button variant={'contained'} className={style.btn} onClick={onClickHandler}>
          Learn to pack
        </Button>
      </div>
      <div style={{ textAlign: 'start' }}>Search</div>
      <TextField sx={{ width: '100%' }} />
      <div className={style.container}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
              <TableRow>
                <TableCell align="left">
                  <b>Question</b>
                </TableCell>
                <TableCell align="left">
                  <b>Answer</b>
                </TableCell>
                <TableCell align="left">
                  <b>Last Updated</b>
                </TableCell>
                <TableCell align="left">
                  <b>Grade</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map(el => (
                <Card card={el} key={el._id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination count={10} shape="rounded" color="primary" />
      <SuperSelect style={{ width: 50 }} />
    </div>
  )
}
