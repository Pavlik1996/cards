import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

import { AppDispatch } from '../../../app/store'
import { cardsActions } from '../CardsSlice'

import style from './BackButton.module.css'

type PropsType = {
  dispatch: AppDispatch
}

export const BackButton: React.FC<PropsType> = props => {
  const { dispatch } = props
  const navigate = useNavigate()

  const onClickBackHandler = () => {
    navigate('/packs')
    dispatch(cardsActions.resetSlice())
  }

  return (
    <div className={style.back} onClick={onClickBackHandler}>
      <KeyboardBackspaceIcon />
      <span>Back to Packs List</span>
    </div>
  )
}
