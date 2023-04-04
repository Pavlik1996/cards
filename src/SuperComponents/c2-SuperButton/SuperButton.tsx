import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  // const finalClassName = s.button
  //     + (disabled ? ` ${s.disabled}` : ' ') +
  //     (xType === 'red' ? ` ${s.red}` :
  //         xType === 'secondary' ? ' ' + s.secondary :
  //             ' ' + s.default)
  //let finalClassName = ''

  const finalClassNameFunc = () => {
    let a = s.button

    if (disabled) {
      a = `${a} ${s.disabled}`
    }

    if (xType === 'red') {
      a = `${a} ${s.red}`
    } else if (xType === 'secondary') {
      a = `${a} ${s.secondary}`
    } else {
      a = `${a} ${s.default}`
    }

    return a
  }
  //const finalClassName = s.button + if(disabled) {

  // const fclass = `${s.button} ${disabled ? s.disabled : ''} ${xType === 'red' ? s.red : ''} ${xType === 'secondary' ? ' ' + s.secondary : ''} ${s.default}`

  // задачка на смешивание классов
  // + (disabled
  // ? ...
  // : xType === 'red'
  //     ? ...
  // + (className ? ' ' + className : '') // задачка на смешивание классов

  return (
    <button
      disabled={disabled}
      className={finalClassNameFunc()}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}

export default SuperButton
