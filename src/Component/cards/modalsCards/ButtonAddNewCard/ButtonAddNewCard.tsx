import { ChangeEvent, useState } from 'react'

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
}

export const ButtonAddNewCard: React.FC<PropsType> = ({ dispatch, sort }) => {
  const [valueQ, setValueQ] = useState('')
  const [valueA, setValueA] = useState('')
  const [clouse, setClouse] = useState(false)

  const onClickAddCardHandler = () => {
    dispatch(
      cardsThunks.addNewCard({
        sort: !sort ? sortEnums.down : sortEnums.up,
        answer: valueA,
        question: valueQ,
      })
    )
  }

  const onChangeAnswer = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueA(e.currentTarget.value)
  }

  const onChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueQ(e.currentTarget.value)
  }

  const onClickCalncelHandler = () => {
    setClouse(true)
    console.log('1')
  }

  return (
    <div className={style.packButton}>
      <h2>Friends Pack</h2>
      <BasicModal
        variant={'contained'}
        name={'Add New Card'}
        className={style.btn}
        style={styleObj}
        clouse={clouse}
      >
        <div className={style.body}>
          <h2>
            Add new card<hr></hr>
          </h2>

          <Select size="small"></Select>
          <div className={style.inputs}>
            <TextField
              label="Question"
              variant="standard"
              value={valueQ}
              onChange={onChangeQuestion}
            />
            <TextField label="Answer" variant="standard" value={valueA} onChange={onChangeAnswer} />
          </div>
          <div className={style.buttons}>
            <Button
              variant={'outlined'}
              className={style.btnCancel}
              onClick={onClickCalncelHandler}
            >
              Cancel
            </Button>
            <Button variant={'contained'} className={style.btnSave} onClick={onClickAddCardHandler}>
              Save
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
