import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useActions } from '../../../../common/utils/hooks/useActions'
import { DeletePackModal } from '../../modals/delete-modal/DeletePackModal'
import { EditPackModal } from '../../modals/edit-modal/EditPackModal'
import { packsActions } from '../../packs-slice'
import { CardPacksType } from '../../packs-types'

import s from './TableBody.module.css'

const style = {
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
  },
}

export const TableBodyComponent: React.FC<TableBodyComponentType> = ({ cardPacks, user_id }) => {
  const { setPackId } = useActions(packsActions)

  const navigate = useNavigate()

  const redirectToCardsHandler = (packId: string) => {
    setPackId({ packId })
    navigate(`/tablecards/${packId}`)
  }
  const onClick = () => {
    alert('start studying')
  }

  return (
    <TableBody>
      {cardPacks.map((el: CardPacksType) => {
        const data = new Date(el.updated)
        const formatedDate = new Intl.DateTimeFormat(['ru']).format(data)

        return (
          <TableRow key={el._id} sx={style.tableRow} hover>
            <TableCell
              className={s.nameCell}
              component="th"
              scope="row"
              onClick={() => {
                redirectToCardsHandler(el._id)
              }}
            >
              {el.name}
            </TableCell>
            <TableCell>{el.cardsCount}</TableCell>
            <TableCell>{formatedDate}</TableCell>
            <TableCell>{el.user_name}</TableCell>
            <TableCell>
              {user_id === el.user_id ? (
                <div className={s.btnsWrapper}>
                  <IconButton onClick={onClick} color="primary" disabled={el.cardsCount === 0}>
                    <SchoolIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <EditPackModal id={el._id} prevName={el.name} />
                  </IconButton>
                  <IconButton color="primary">
                    <DeletePackModal id={el._id} prevName={el.name} />
                  </IconButton>
                </div>
              ) : (
                <IconButton onClick={onClick} color="primary" disabled={el.cardsCount === 0}>
                  <SchoolIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

type TableBodyComponentType = { cardPacks: CardPacksType[]; user_id: string }
