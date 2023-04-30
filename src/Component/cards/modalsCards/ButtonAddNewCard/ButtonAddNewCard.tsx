import { ChangeEvent, useState } from 'react'
import * as React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button, Select, TextField } from '@mui/material'

import { AppDispatch } from '../../../../app/store'
import { cardsThunks } from '../../CardsSlice'
import { sortEnums } from '../../enums/cards-enums'
import { BasicModal } from '../BasicModal'

import style from './ButtonAddNewCard.module.css'

type PropsType = {
  dispatch: AppDispatch
  sort: boolean
}

const styleObj = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
}

export const ButtonAddNewCard: React.FC<PropsType> = ({ dispatch, sort }) => {
  const [valueQ, setValueQ] = useState('')
  const [valueA, setValueA] = useState('')

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onClickAddCardHandler = () => {
    dispatch(
      cardsThunks.addNewCard({
        sort: !sort ? sortEnums.down : sortEnums.up,
        answer: valueA,
        question: valueQ,
      })
    )
    handleClose()
    setValueA('')
    setValueQ('')
  }

  const onChangeAnswer = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueA(e.currentTarget.value)
  }

  const onChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueQ(e.currentTarget.value)
  }

  return (
    <div className={style.packButton}>
      <h2>My Pack</h2>
      <BasicModal
        variant={'contained'}
        name={'Add New Card'}
        className={style.btn}
        style={styleObj}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        btn={'btn'}
      >
        <div className={style.body}>
          <h2 className={style.modalHeader}>
            Add new card
            <CloseIcon onClick={handleClose} className={style.closeIcon} />
          </h2>
          <hr />
          <Select size="small"></Select>
          <div className={style.inputs}>
            <TextField
              label="Question"
              variant="standard"
              value={valueQ}
              onChange={onChangeQuestion}
              sx={{ paddingTop: '10px', paddingBottom: '10px' }}
            />
            <TextField
              label="Answer"
              variant="standard"
              value={valueA}
              onChange={onChangeAnswer}
              sx={{ paddingTop: '10px', paddingBottom: '10px' }}
            />
          </div>
          <div className={style.buttons}>
            <Button variant={'outlined'} className={style.btnCancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant={'contained'} className={style.btnSave} onClick={onClickAddCardHandler}>
              AddCard
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
