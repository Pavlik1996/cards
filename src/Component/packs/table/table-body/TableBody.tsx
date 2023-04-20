import React from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolIcon from '@mui/icons-material/School'
import TableBody from '@mui/material/TableBody/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/store'
import { UpdatePackModal } from '../../modals/UpdatePackModal'
import { packsActions, packsThunks } from '../../packs-slice'
import { CardPacksType } from '../../packs-types'

export const TableBodyComponent: React.FC<TableBodyComponentType> = ({ cardPacks, user_id }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <TableBody>
      {cardPacks.map((el: CardPacksType) => {
        const data = new Date(el.updated)
        const formatedDate = new Intl.DateTimeFormat(['ru']).format(data)

        return (
          <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
            <TableCell
              component="th"
              scope="row"
              onClick={() => {
                dispatch(packsActions.setPackId({ packId: el._id }))
                navigate('/tablecards')
              }}
            >
              {el.name}
            </TableCell>
            <TableCell>{el.cardsCount}</TableCell>
            <TableCell>{formatedDate}</TableCell>
            <TableCell>{el.user_name}</TableCell>
            <TableCell>
              {user_id === el.user_id ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <SchoolIcon
                    onClick={() => {
                      alert('start studing')
                    }}
                  />
                  <UpdatePackModal id={el._id} />
                  <DeleteOutlineIcon
                    onClick={() => {
                      dispatch(packsThunks.deletePack(el._id))
                    }}
                  />
                </div>
              ) : (
                <SchoolIcon
                  onClick={() => {
                    alert('start studying')
                  }}
                />
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

type TableBodyComponentType = { cardPacks: CardPacksType[]; user_id: string }
