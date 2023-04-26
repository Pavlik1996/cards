import React, { useState } from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Button from '@mui/material/Button'

import { useActions } from '../../../../common/utils/hooks/useActions'
import { packsThunks } from '../../packs-slice'
import { BaseModal } from '../BaseModal'

import s from './DeletePackModal.module.css'

type DeleteType = { id: string; prevName: string }

export const DeletePackModal: React.FC<DeleteType> = ({ id, prevName }) => {
  const { deletePack } = useActions(packsThunks)

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const deletePackHandler = () => {
    deletePack(id)
    handleClose()
  }

  return (
    <BaseModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={'Delete PACK'}
      button={<DeleteOutlineIcon />}
    >
      <div>
        Do you really want to remove <span className={s.text}>{prevName}</span>? All cards will be
        deleted.
      </div>
      <div className={s.btnWrapper}>
        <Button onClick={deletePackHandler} variant="contained" color="error">
          delete
        </Button>
      </div>
    </BaseModal>
  )
}
