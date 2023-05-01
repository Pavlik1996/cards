import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { AppDispatch } from '../../../app/store'
import { cardsThunks } from '../CardsSlice'

import s from './LearnButton.module.css'

type PropsType = {
  cardsPack_id: string | undefined
  dispatch: AppDispatch
}

export const LearnButton: React.FC<PropsType> = ({ cardsPack_id, dispatch }) => {
  const navigate = useNavigate()

  const onClickHandler = () => navigate('/learn')

  return (
    <div className={s.body}>
      <h2>Friend’s Pack</h2>
      <Button className={s.btn} variant="contained" onClick={onClickHandler}>
        Learn to pack
      </Button>
    </div>
  )
}
