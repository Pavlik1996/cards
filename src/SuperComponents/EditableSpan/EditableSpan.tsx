import React, { ChangeEvent, memo, useCallback, useState } from 'react'

import { TextField } from '@mui/material'

import { useAppDispatch } from '../../app/store'
import { cardsThunks } from '../../Component/cards/CardsSlice'

type EditableSpanPropsType = {
  value: string
  setEditMode: (value: boolean) => void
  editMode: boolean
  id: string
}

export const EditableSpan = memo(function (props: EditableSpanPropsType) {
  let [title, setTitle] = useState(props.value)
  const dispatch = useAppDispatch()

  const activateEditMode = () => {
    props.setEditMode(true)
    setTitle(props.value)
  }

  const activateViewMode = () => {
    props.setEditMode(false)
    if (props.value !== title) {
      dispatch(cardsThunks.updateCard({ id: props.id, question: title }))
    }
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return props.editMode ? (
    <TextField
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      size={'small'}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  )
})
