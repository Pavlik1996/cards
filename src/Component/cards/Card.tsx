import React, { FC } from 'react'

import { TableRow, TableCell, Rating } from '@mui/material'
import { useSelector } from 'react-redux'

import { selectAuthUserId } from '../auth/auth-selector'

import { CardType } from './cardsApi/cardsApi'
import { ButtonDeleteCard } from './modalsCards/ButtonDeleteCard/ButtonDeleteCard'
import { ButtonEditCard } from './modalsCards/ButtonEditCard/ButtonEditCard'

type PropsType = {
  card: CardType
  page: number
  pageCount: number
  sort: number
  cardsPack_id: string | undefined
}

export const Card: FC<PropsType> = ({ card, page, pageCount, sort }) => {
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
            <ButtonDeleteCard card={card} page={page} pageCount={pageCount} sort={sort} />
            <ButtonEditCard id={card._id} answer={card.answer} question={card.question} />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}
