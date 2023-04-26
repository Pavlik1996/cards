import React, { ChangeEvent } from 'react'

import s from '../SearchPacksBar.module.css'

export const SliderInput: React.FC<SliderInputType> = ({
  activeThumb,
  value,
  setValue,
  min,
  max,
  setIsDebounced,
}) => {
  const changeInputValue = (activeThumb: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setIsDebounced(true)
    let currentValue = e.currentTarget.valueAsNumber

    if (currentValue < min) currentValue = min
    if (currentValue > max) currentValue = max

    if (activeThumb === 0) setValue([!currentValue ? 0 : Math.trunc(currentValue), value[1]])
    if (activeThumb === 1) setValue([!currentValue ? 0 : Math.trunc(currentValue), value[0]])
  }

  return (
    <input
      type="number"
      className={s.sliderInput}
      value={Number(value[activeThumb]).toFixed()}
      onChange={changeInputValue(activeThumb)}
    />
  )
}

type SliderInputType = {
  activeThumb: 0 | 1
  value: number[]
  setValue: (numbers: number[]) => void
  min: number
  max: number
  setIsDebounced: (isDebounce: boolean) => void
}
