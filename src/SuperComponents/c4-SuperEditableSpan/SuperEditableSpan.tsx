import { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button'

import pen from '../../assets/imgs/pen.svg'

import s from './SuperEditableSpan.module.css'
import { useForm } from 'react-hook-form'

type PropsType = {
	value: string
	callback: (newValue: string) => void
}

export const SuperEditableSpan = ({ value = '', callback }: PropsType) => {
	const [editMode, setEditMode] = useState(false)
	const [userName, setUserName] = useState(value)
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setUserName(e.currentTarget.value)
	}
	const { register, handleSubmit } = useForm()

	const changeEditModeHandler = () => {
		setEditMode(true)
	}

	const onSubmit = () => {
		if (callback) {
			callback(userName)
		}
		setEditMode(false)
	}

	return editMode ? (
		<div className={s.inputWrapper}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<label className={s.labelInput}>
					<span>Nickname</span>
					<input
						{...register('name')}
						value={userName}
						onChange={onChangeName}
						// className={errorName ? `${s.input} ${s.errorInput}` : s.input}
						className={s.input}
					/>
					<Button type={'submit'} variant={'contained'} className={s.btnSave}>
						SAVE
					</Button>
				</label>
			</form>
			{/* {errorName && <div className={s.errorName}>{errorName}</div>} */}
		</div>
	) : (
		<div className={s.userNameContainer}>
			<h3 className={s.userName}>{value}</h3>
			<img
				onClick={changeEditModeHandler}
				className={s.iconPen}
				src={pen}
				alt='icon pen for redaction name'
			/>
		</div>
	)
}
