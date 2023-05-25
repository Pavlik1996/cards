import React, { useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useActions } from '../../../../common/utils/hooks/useActions'
import { packsThunks } from '../../packs-slice'
import { BaseModal } from '../BaseModal'

import s from './EditPackModal.module.css'

export const EditPackModal: React.FC<EditType> = ({ id, prevName }) => {
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
    const finalData = { cardsPack: { _id: id, name: data.name } }

    updatePack(finalData)
    setOpen(false)
    handleClose()
    reset(data)
  }

  return (
    <BaseModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={'Edit PACK'}
      button={<BorderColorIcon />}
    >
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

type EditType = { id: string; prevName: string }
