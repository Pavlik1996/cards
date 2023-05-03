import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import s from './LearnButton.module.css'

export const LearnButton = () => {
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
