import { ChangeEvent, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button, Select, TextField } from '@mui/material'

import { AppDispatch } from '../../../../app/store'
import { cardsThunks } from '../../CardsSlice'
import { BasicModal } from '../BasicModal'

import style from './ButtonEditCard.module.css'

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

type PropsType = {
  answer: string
  question: string
  dispatch: AppDispatch
  id: string
}

export const ButtonEditCard: React.FC<PropsType> = ({ dispatch, id, answer, question }) => {
  const [valueQ, setValueQ] = useState(question)
  const [valueA, setValueA] = useState(answer)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onClickHandler = () => {
    dispatch(cardsThunks.updateCard({ answer: valueA, id, question: valueQ }))

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
    <div>
      <BasicModal
        variant={'contained'}
        name={''}
        className={''}
        style={styleObj}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        btn={'edit'}
      >
        <div className={style.body}>
          <h2 className={style.modalHeader}>
            Edit card
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
            <Button variant={'contained'} className={style.btnSave} onClick={onClickHandler}>
              Save
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
