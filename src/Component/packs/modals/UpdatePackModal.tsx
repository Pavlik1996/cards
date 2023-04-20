import React, { useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import { Checkbox, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../../app/store'
import { packsThunks } from '../packs-slice'

import s from './Modals.module.css'

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
  textfield: {
    margin: '24px 0 12px 0',
  },
}

export const UpdatePackModal: React.FC<UpdatePackModalType> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      private: false,
      deckCover:
        'https://i.etsystatic.com/7984009/r/il/520d63/1138545381/il_570xN.1138545381_mx07.jpg',
    },
  })
  const onSubmit: SubmitHandler<any> = data => {
    const finalData = { cardsPack: { _id: id, name: data.name } }

    dispatch(packsThunks.updatePack(finalData))
    setOpen(false)
    reset()
  }

  return (
    <div>
      <BorderColorIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.wrapper}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            Update this PACK
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} align="center">
            To update this PACK, fill in the fields below
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="New PACK's name"
                  variant="outlined"
                  required={true}
                  {...field}
                  sx={style.textfield}
                />
              )}
            />
            <Controller
              name="deckCover"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="New deck cover"
                  variant="outlined"
                  disabled={true}
                  {...field}
                  sx={style.textfield}
                />
              )}
            />
            <Controller
              name="private"
              control={control}
              render={({ field }) => (
                <label className={s.checkbox}>
                  <Checkbox {...field} disabled={true} />
                  Private PACK
                </label>
              )}
            />
            <Button type="submit" variant="outlined" sx={{ mt: 4 }}>
              Update PACK
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

type UpdatePackModalType = {
  id: string
}
