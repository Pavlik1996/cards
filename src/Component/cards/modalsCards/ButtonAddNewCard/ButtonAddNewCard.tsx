import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button, TextField } from '@mui/material'

import { useActions } from '../../../../common/utils/hooks/useActions'
import { InputTypeFile } from '../../../../common/utils/InputTypeFIle'
import SuperSelect from '../../../../SuperComponents/c5-SuperSelect/SuperSelect'
import { cardsThunks } from '../../CardsSlice'
import { sortEnums } from '../../enums/cards-enums'
import FadeMenu from '../../Menu/MenuComponent'
import { BasicModal } from '../BasicModal'

import s from './ButtonAddNewCard.module.css'

const arrSelectValue = [
  { id: 1, value: 'Вопрос текстом' },
  { id: 2, value: 'Вопрос картинкой' },
]

type PropsType = {
  sort: boolean
  cardsPack_id: string | undefined
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

export const ButtonAddNewCard: React.FC<PropsType> = ({ sort, cardsPack_id }) => {
  const [baseImg, setBaseImg] = useState('')
  const [value, onChangeOption] = useState(1)
  const [valueQ, setValueQ] = useState('')
  const [valueA, setValueA] = useState('')

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { addNewCard } = useActions(cardsThunks)

  const addCardHandler = () => {
    addNewCard({
      sort: !sort ? sortEnums.down : sortEnums.up,
      answer: valueA,
      question: valueQ,
      questionImg: baseImg,
      cardsPack_id,
    })
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
    <div className={s.packButton}>
      <h2>
        My Pack
        <FadeMenu />
      </h2>
      <BasicModal
        variant={'contained'}
        name={'Add New Card'}
        className={s.btn}
        style={styleObj}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        btn={'btn'}
      >
        <div className={s.body}>
          <h2 className={s.modalHeader}>
            Add new card
            <CloseIcon onClick={handleClose} className={s.closeIcon} />
          </h2>
          <hr />
          <SuperSelect options={arrSelectValue} value={value} onChangeOption={onChangeOption} />
          <div className={s.inputs}>
            {value === 1 ? (
              <TextField
                label="Question"
                variant="standard"
                value={valueQ}
                onChange={onChangeQuestion}
                sx={{ paddingTop: '10px', paddingBottom: '10px' }}
              />
            ) : (
              <>
                <img src={baseImg} className={s.coverImg} alt={'1'} />
                <InputTypeFile setImage={setBaseImg} />
              </>
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
            <Button variant={'contained'} className={s.btnSave} onClick={addCardHandler}>
              AddCard
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
