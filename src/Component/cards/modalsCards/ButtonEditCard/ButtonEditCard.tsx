import * as React from 'react'
import { ChangeEvent, FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button, TextField } from '@mui/material'

import { useActions } from '../../../../common/utils/hooks/useActions'
import { InputTypeFile } from '../../../../common/utils/InputTypeFIle'
import { cardsThunks } from '../../CardsSlice'
import { BasicModal } from '../BasicModal'

import s from './ButtonEditCard.module.css'

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
  id: string
  questionImg: string
}

export const ButtonEditCard: FC<PropsType> = ({ id, answer, question, questionImg }) => {
  const [baseImg, setBaseImg] = useState(questionImg)
  const [valueQ, setValueQ] = useState(question)
  const [valueA, setValueA] = useState(answer)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { updateCard } = useActions(cardsThunks)

  const onClickHandler = () => {
    updateCard({ answer: valueA, id, question: valueQ, questionImg: baseImg })

    handleClose()
    setValueA('')
    setValueQ('')
    setBaseImg('')
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
        <div className={s.body}>
          <h2 className={s.modalHeader}>
            Edit card
            <CloseIcon onClick={handleClose} className={s.closeIcon} />
          </h2>
          <hr />
          <div className={s.inputs}>
            {questionImg ? (
              <>
                <img src={baseImg} alt={'11'} className={s.coverImg} />
                <InputTypeFile setImage={setBaseImg} />
              </>
            ) : (
              <TextField
                label="Question"
                variant="standard"
                value={valueQ}
                onChange={onChangeQuestion}
                sx={{ paddingTop: '10px', paddingBottom: '10px' }}
              />
            )}

            <TextField
              label="Answer"
              variant="standard"
              value={valueA}
              onChange={onChangeAnswer}
              sx={{ paddingTop: '10px', paddingBottom: '10px' }}
            />
          </div>
          <div className={s.buttons}>
            <Button variant={'outlined'} className={s.btnCancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant={'contained'} className={s.btnSave} onClick={onClickHandler}>
              Save
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
