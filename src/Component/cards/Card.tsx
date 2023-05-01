import React from 'react'

import { TableRow, TableCell, Rating } from '@mui/material'
import { useSelector } from 'react-redux'

import { AppDispatch } from '../../app/store'
import { selectAuthUserId } from '../auth/auth-selector'

import { CardType } from './cardsApi/cardsApi'
import { ButtonDeleteCard } from './modalsCards/ButtonDeleteCard/ButtonDeleteCard'
import { ButtonEditCard } from './modalsCards/ButtonEditCard/ButtonEditCard'

type PropsType = {
  card: CardType
  page: number
  pageCount: number
  sort: number
  dispatch: AppDispatch
  cardsPack_id: string | undefined
}

export const Card: React.FC<PropsType> = ({ card, page, pageCount, sort, dispatch }) => {
  const userId = useSelector(selectAuthUserId)

  const data = new Date(card.updated)
  const formattedDate = new Intl.DateTimeFormat(['ru']).format(data)

  return (
    <TableRow key={card._id}>
      <TableCell component="th" scope="row">
        {card.question}
      </TableCell>
      <TableCell align="left">{card.answer}</TableCell>
      <TableCell align="left">{formattedDate}</TableCell>
      <TableCell align="left">
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      </TableCell>
      <TableCell>
        {card.user_id === userId && (
          <div style={{ display: 'flex' }}>
            <ButtonDeleteCard
              card={card}
              dispatch={dispatch}
              page={page}
              pageCount={pageCount}
              sort={sort}
            />
            <ButtonEditCard
              dispatch={dispatch}
              id={card._id}
              answer={card.answer}
              question={card.question}
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}
