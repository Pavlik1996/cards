import React, { useState } from 'react'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useActions } from '../../../../common/utils/hooks/useActions'
import { convertFileToBase64 } from '../../convert-file-base64'
import { packsThunks } from '../../packs-slice'
import { BaseModal } from '../BaseModal'

import s from './AddPackModal.module.css'

export const AddPackModal = () => {
  const { addPack } = useActions(packsThunks)

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      private: false,
    },
  })
  const onSubmit: SubmitHandler<any> = data => {
    const finalData = { cardsPack: { ...data, deckCover: ava } }

    addPack(finalData)
    handleClose()
    reset(data)
  }

  const [ava, setAva] = useState<string>('')
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0]

      const formData = new FormData()

      formData.append('img_file', file, file.name)

      convertFileToBase64(file, (file64: string) => {
        setAva(file64)
      })
    }
  }

  return (
    <BaseModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={'Add new PACK'}
      button={<Button variant="contained">Add new pack</Button>}
    >
      <div style={{ margin: '10px 0 10px 0' }}>
        {ava && <img src={ava} style={{ width: '100px' }} alt="ava" />}
        <label>
          <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
          <IconButton component="span">
            <AddPhotoAlternateIcon />
          </IconButton>
        </label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Your PACK's name"
              variant="outlined"
              required={true}
              {...field}
              className={s.textfield}
            />
          )}
        />
        <Controller
          name="private"
          control={control}
          render={({ field }) => (
            <label className={s.checkbox}>
              <Checkbox {...field} />
              Private PACK
            </label>
          )}
        />
        <Button type="submit" variant="contained" className={s.btn} color="primary">
          save
        </Button>
      </form>
    </BaseModal>
  )
}
