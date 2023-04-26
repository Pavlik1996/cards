import * as React from 'react'

import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

type PropsType = {
  children: React.ReactNode
  variant?: 'text' | 'outlined' | 'contained' | undefined
  btn: 'btn' | 'delete' | 'edit'
  name: string
  className?: any
  style: any
  open: boolean
  handleOpen: (value: boolean) => void
  handleClose: (value: boolean) => void
}

export const BasicModal: React.FC<PropsType> = ({
  children,
  variant,
  name,
  className,
  style,
  handleClose,
  handleOpen,
  open,
  btn,
}) => {
  const showButton = () => {
    if (btn === 'btn') {
      return (
        <Button onClick={() => handleOpen(true)} variant={variant} className={className}>
          {name}
        </Button>
      )
    } else if (btn === 'delete') {
      return (
        <IconButton onClick={() => handleOpen(true)}>
          <Delete />
        </IconButton>
      )
    } else if (btn === 'edit') {
      return (
        <IconButton onClick={() => handleOpen(true)}>
          <Edit />
        </IconButton>
      )
    }
  }

  return (
    <div>
      {showButton()}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
