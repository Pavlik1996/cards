import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

import { useActions } from '../../../common/utils/hooks/useActions'
import { cardsActions } from '../CardsSlice'

import s from './BackButton.module.css'

export const BackButton = () => {
  const { resetSlice } = useActions(cardsActions)
  const navigate = useNavigate()

  const onClickBackHandler = () => {
    navigate('/packs')
    resetSlice()
  }

  return (
    <div className={s.back} onClick={onClickBackHandler}>
      <KeyboardBackspaceIcon />
      <span>Back to Packs List</span>
    </div>
  )
}
