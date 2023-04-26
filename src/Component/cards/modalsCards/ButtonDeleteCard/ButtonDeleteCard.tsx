import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'

import { AppDispatch } from '../../../../app/store'
import { CardType } from '../../cardsApi/cardsApi'
import { cardsThunks } from '../../CardsSlice'
import { BasicModal } from '../BasicModal'

import style from './ButtonDelete.module.css'

const styleObj = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
}

type PropsType = {
  dispatch: AppDispatch
  card: CardType
  page: number
  pageCount: number
  sort: number
}

export const ButtonDeleteCard: React.FC<PropsType> = ({
  dispatch,
  card,
  page,
  pageCount,
  sort,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onClickHandler = () => {
    dispatch(cardsThunks.deleteCard({ card, page, pageCount, sort }))
    handleClose()
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
        btn={'delete'}
      >
        <div className={style.body}>
          <h2 className={style.modalHeader}>
            Delete Card
            <CloseIcon onClick={handleClose} className={style.closeIcon} />
          </h2>
          <hr />
          <span>Do you really want to remove?</span>
          <div className={style.btn}>
            <Button className={style.btnCancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={onClickHandler} variant={'contained'} className={style.btnDelete}>
              Delete
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
