import React, { useState } from 'react'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useActions } from '../../../../common/utils/hooks/useActions'
import { convertFileToBase64 } from '../../convert-file-base64'
import { packsThunks } from '../../packs-slice'
import { BaseModal } from '../BaseModal'

import s from './EditPackModal.module.css'

export const EditPackModal: React.FC<EditType> = ({ id, prevName, prevCover }) => {
  const { updatePack } = useActions(packsThunks)

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: prevName,
      private: false,
    },
  })
  const onSubmit: SubmitHandler<any> = data => {
    const finalData = { cardsPack: { _id: id, name: data.name, deckCover: ava } }

    updatePack(finalData)
    setOpen(false)
    handleClose()
    reset(data)
  }

  const [ava, setAva] = useState<string | undefined>(prevCover)
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
      title={'Edit PACK'}
      button={<BorderColorIcon />}
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
              label="New PACK's name"
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
        <Button type="submit" variant="contained" className={s.btn}>
          save
        </Button>
      </form>
    </BaseModal>
  )
}

type EditType = { id: string; prevName: string; prevCover?: string | undefined }
