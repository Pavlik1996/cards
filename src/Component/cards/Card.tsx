import { TableRow, TableCell, Rating } from '@mui/material'

import { CardType } from './cardsApi'

type PropsType = {
  card: CardType
}

export const Card: React.FC<PropsType> = props => {
  const card = props.card

  return (
    <TableRow key={card._id}>
      <TableCell component="th" scope="row">
        {card.question}
      </TableCell>
      <TableCell align="left">{card.answer}</TableCell>
      <TableCell align="left">{card.updated}</TableCell>
      <TableCell align="left">
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      </TableCell>
    </TableRow>
  )
}
