import React, { ChangeEvent } from 'react'

import { appActions } from '../../app/app-slice'

import { useAppDispatch } from './hooks/useAppDispatch'

type PropsType = {
  setImage: (img: string) => void
}

export const InputTypeFile: React.FC<PropsType> = ({ setImage }) => {
  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setImage(file64)
        })
      } else {
        dispatch(appActions.setError({ error: 'Size of image is too big' }))
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} accept={'image/*'} />
    </label>
  )
}
