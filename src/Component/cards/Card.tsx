import { useState } from 'react'

import { Delete } from '@mui/icons-material'
import Edit from '@mui/icons-material/Edit'
import { TableRow, TableCell, Rating, IconButton } from '@mui/material'

import { useAppDispatch } from '../../app/store'
import { EditableSpan } from '../../SuperComponents/EditableSpan/EditableSpan'

import { CardType } from './cardsApi/cardsApi'
import { cardsThunks } from './CardsSlice'

type PropsType = {
  card: CardType
  page: number
  pageCount: number
  sort: number
}

export const Card: React.FC<PropsType> = props => {
  let [editMode, setEditMode] = useState(false)
  const card = props.card

  const dispatch = useAppDispatch()

  const onClickDeleteHandler = () => {
    dispatch(
      cardsThunks.deleteCard({
        card,
        page: props.page,
        pageCount: props.pageCount,
        sort: props.sort,
      })
    )
  }

  const onClickEditHandler = () => {
    setEditMode(!editMode)
  }

  const data = new Date(props.card.updated)
  const formattedDate = new Intl.DateTimeFormat(['ru']).format(data)

  return (
    <TableRow key={card._id}>
      <TableCell component="th" scope="row">
        <EditableSpan
          editMode={editMode}
          setEditMode={setEditMode}
          value={card.question}
          id={card._id}
        />
      </TableCell>
      <TableCell align="left">{card.answer}</TableCell>
      <TableCell align="left">{formattedDate}</TableCell>
      <TableCell align="left">
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      </TableCell>
      <TableCell>
        <div>
          <IconButton onClick={onClickDeleteHandler} disabled={editMode}>
            <Delete />
          </IconButton>
          <IconButton onClick={onClickEditHandler} disabled={editMode}>
            <Edit />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  )
}
