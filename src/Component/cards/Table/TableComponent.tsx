import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from '@mui/material'

import { useAppDispatch } from '../../../app/store'
import { Card } from '../Card'
import { ResponseGetCardsType } from '../cardsApi/cardsApi'

import style from './Table.module.css'

type PropsType = {
  cardsPack_id: string | undefined
  sort: boolean
  page: number
  pageCount: number
  cards: ResponseGetCardsType
  setSort: (value: boolean) => void
}

export const TableComponent: React.FC<PropsType> = ({
  cardsPack_id,
  setSort,
  sort,
  cards,
  page,
  pageCount,
}) => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    setSort(!sort)
  }

  return (
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
  )
}
