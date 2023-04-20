import React, { useEffect, useState } from 'react'

import { Slider } from '@mui/material'
import { useSelector } from 'react-redux'

import { RootStateType, useAppDispatch } from '../../../../app/store'
import { useDebounce } from '../../../../common/utils/hooks/useDebounce'
import { packsActions } from '../../packs-slice'
import s from '../SearchPacksBar.module.css'

import { SliderInput } from './SliderInput'

export const SliderField: React.FC<SliderFieldPropsType> = ({ min, max }) => {
  const dispatch = useAppDispatch()
  const minVR = useSelector<RootStateType, number>(state => state.packs.minCardsCount)
  const maxVR = useSelector<RootStateType, number>(state => state.packs.maxCardsCount)
  const [values, setValues] = useState<number[]>([min, max])
  const debouncedValues = useDebounce<number[]>(values)

  const onChange = (event: Event, value: number[] | number) => {
    setValues(value as number[])
  }

  useEffect(() => {
    dispatch(packsActions.setMin({ min: minVR }))
    dispatch(packsActions.setMax({ max: maxVR }))
  }, [maxVR])

  useEffect(() => {
    setValues([min, max])
  }, [min, max])

  useEffect(() => {
    dispatch(packsActions.setMin({ min: debouncedValues[0] }))
    dispatch(packsActions.setMax({ max: debouncedValues[1] }))
  }, [debouncedValues])

  return (
    <div className={s.sliderWrapper}>
      <h4>Number of cards</h4>
      <div className={s.sliderItems}>
        <SliderInput activeThumb={0} value={values} setValue={setValues} min={minVR} max={maxVR} />
        <Slider
          value={values}
          onChange={onChange}
          disableSwap
          min={minVR}
          max={maxVR}
          className={s.slider}
        />
        <SliderInput activeThumb={1} value={values} setValue={setValues} min={minVR} max={maxVR} />
      </div>
    </div>
  )
}

type SliderFieldPropsType = {
  min: number
  max: number
}
