import React, { ReactNode } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import s from './BaseModal.module.css'

const style = {
  wrapper: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
}

export const BaseModal: React.FC<BaseModalType> = ({
  open,
  handleOpen,
  handleClose,
  title,
  button,
  children,
}) => {
  return (
    <>
      <div onClick={handleOpen}>{button}</div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style.wrapper}>
          <div className={s.title}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </div>
          {children}
        </Box>
      </Modal>
    </>
  )
}

type BaseModalType = {
  open: boolean
  title: string
  button: ReactNode
  children: ReactNode
  handleOpen: () => void
  handleClose: () => void
}
