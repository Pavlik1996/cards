import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useActions } from '../../../../common/utils/hooks/useActions'
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
    const finalData = { cardsPack: data }

    addPack(finalData)
    handleClose()
    reset()
  }

  return (
    <BaseModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={'Add new PACK'}
      button={<Button variant="contained">Add new pack</Button>}
    >
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
