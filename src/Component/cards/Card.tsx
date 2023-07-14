import React, { FC } from 'react'

import { TableRow, TableCell, Rating } from '@mui/material'
import { useSelector } from 'react-redux'

import cover from '../../assets/imgs/standard_cover.svg'
import { selectUserId } from '../Profile/profile-selector'

import s from './card.module.css'
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
  const userId = useSelector(selectUserId)

  const data = new Date(card.updated)
  const formattedDate = new Intl.DateTimeFormat(['ru']).format(data)

  return (
    <TableRow key={card._id}>
      <TableCell component="th" scope="row" className={s.cellQuestion}>
        <img src={card.questionImg || cover} alt={'ddd'} className={s.coverImg} />
        {card.question}
      </TableCell>
      <TableCell align="left" className={s.cellAnswer}>
        {card.answer.length > 50 ? `${card.answer.substring(0, 50)}...` : card.answer}
      </TableCell>
      <TableCell align="left">{formattedDate}</TableCell>
      <TableCell align="left">
        <Rating name="half-rating" defaultValue={card.grade} precision={1} />
      </TableCell>
      <TableCell>
        {card.user_id === userId && (
          <div style={{ display: 'flex' }}>
            <ButtonDeleteCard card={card} page={page} pageCount={pageCount} sort={sort} />
            <ButtonEditCard
              id={card._id}
              answer={card.answer}
              question={card.question}
              questionImg={card.questionImg}
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}
