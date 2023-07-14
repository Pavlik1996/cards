import React, { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField'

import pen from '../../assets/imgs/pen.svg'
import submit from '../../assets/imgs/submit.svg'
import { formHandler } from '../../utils/formHandler'

import s from './SuperEditableSpan.module.css'

type EditableSpanType = {
  value: string
  callback?: (newValue: string) => void
}

export const SuperEditableSpan: React.FC<EditableSpanType> = ({ value = '', callback }) => {
  const [isEditMode, setEditMode] = useState(false)
  const [userName, setUserName] = useState(value)
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value)
  }
  const { errorName, register, isValid, handleSubmit } = formHandler('name')
  const onSubmit = () => {
    if (callback) {
      callback(userName)
    }
    setEditMode(false)
  }

  return isEditMode ? (
    <div className={s.inputWrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.labelInput}>
          <span>Nickname</span>
          <input
            {...register('name')}
            value={userName}
            onChange={onChangeName}
            className={errorName ? `${s.input} ${s.errorInput}` : s.input}
          />
          <button disabled={!isValid} type={'submit'} className={s.confirmName}>
            <img className={s.updateIcon} src={submit} alt="submit icon" />
          </button>
        </label>
      </form>
      {errorName && <div className={s.errorName}>{errorName}</div>}
    </div>
  ) : (
    <div className={s.userNameContainer}>
      <h3 className={s.userName}>{value}</h3>
      <img
        onClick={() => setEditMode(true)}
        className={s.iconPen}
        src={pen}
        alt="icon pen for redaction name"
      />
    </div>
  )
}
