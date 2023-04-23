import { Button } from '@mui/material'

import { AppDispatch } from '../../../app/store'
import { cardsThunks } from '../CardsSlice'
import { sortEnums } from '../enums/cards-enums'

import style from './ButtonAddNewCard.module.css'

type PropsType = {
  dispatch: AppDispatch
  cardsPack_id: string
  sort: boolean
}

export const ButtonAddNewCard: React.FC<PropsType> = props => {
  const { dispatch, cardsPack_id, sort } = props

  const onClickAddCardHandler = () => {
    dispatch(cardsThunks.addNewCard({ cardsPack_id, sort: !sort ? sortEnums.down : sortEnums.up }))
  }

  return (
    <div className={style.packButton}>
      <h2>Friends Pack</h2>
      <Button variant={'contained'} className={style.btn} onClick={onClickAddCardHandler}>
        Add New Card
      </Button>
    </div>
  )
}
