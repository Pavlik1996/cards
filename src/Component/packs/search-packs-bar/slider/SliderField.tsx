import React, { useCallback, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '../../../../common/utils/hooks/useDebounce'
import s from '../SearchPacksBar.module.css'

import { SliderInput } from './SliderInput'

export const SliderField: React.FC<SliderFieldPropsType> = ({ min, max }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [values, setValues] = useState<number[]>([
    Number(searchParams.get('min')) || min,
    Number(searchParams.get('max')) || max,
  ])

  const [isDebounced, setIsDebounced] = useState(true)

  const debouncedValues = useDebounce<number[]>(values)

  const changeSliderValuesHandler = (event: Event, value: number[] | number) => {
    setValues(value as number[])
    setIsDebounced(false)
  }

  const onChangeCommittedHandle = useCallback((): void => {
    const params: { min?: string; max?: string } = {}

    if (values[0] !== min) params.min = values[0].toString()
    else searchParams.delete('min')

    if (values[1] !== max) params.max = values[1].toString()
    else searchParams.delete('max')

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
    })
  }, [max, min, searchParams, setSearchParams, values])

  useEffect(() => {
    if (isDebounced) {
      const params: { min?: string; max?: string } = {}

      if (debouncedValues[0] !== min) {
        params.min = debouncedValues[0].toString()
      } else searchParams.delete('min')
      if (debouncedValues[1] !== max) {
        params.max = debouncedValues[1].toString()
      } else searchParams.delete('max')

      setSearchParams({
        ...Object.fromEntries(searchParams),
        ...params,
      })
    }
  }, [debouncedValues, searchParams, setSearchParams])

  useEffect(() => {
    setValues([Number(searchParams.get('min')) || min, Number(searchParams.get('max')) || max])
  }, [min, max, searchParams])

  return (
    <div className={s.sliderWrapper}>
      <h4>Number of cards</h4>
      <div className={s.sliderItems}>
        <SliderInput
          activeThumb={0}
          value={values}
          setValue={setValues}
          min={min}
          max={max}
          setIsDebounced={setIsDebounced}
        />
        <Slider
          value={values}
          onChange={changeSliderValuesHandler}
          onChangeCommitted={onChangeCommittedHandle}
          disableSwap
          min={min}
          max={max}
          className={s.slider}
        />
        <SliderInput
          activeThumb={1}
          value={values}
          setValue={setValues}
          min={min}
          max={max}
          setIsDebounced={setIsDebounced}
        />
      </div>
    </div>
  )
}

type SliderFieldPropsType = {
  min: any
  max: any
}
