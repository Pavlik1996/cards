import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

type PropsType = {
  children: React.ReactNode
  variant: 'text' | 'outlined' | 'contained' | undefined
  name: string
  className: string
  style: any
  clouse: boolean
}

export const BasicModal: React.FC<PropsType> = ({
  children,
  variant,
  name,
  className,
  style,
  clouse,
}) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} variant={variant} className={className}>
        {name}
      </Button>
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
