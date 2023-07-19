import { ChangeEvent } from 'react'

import { useAppDispatch } from '../../app/store'
import camera from '../../assets/imgs/cameraLogo.svg'
import { useActions } from '../../common/utils/hooks/useActions'
import { convertPictureFileTo64 } from '../../utils/ConvertPictureFileTo64'
import { profileThunks } from '../Profile/profile-slice'

import s from './AvatarLoader.module.css'

export const AvatarLoader = () => {
  const dispatch = useAppDispatch()
  const { updateAvatar } = useActions(profileThunks)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 400000) {
        convertPictureFileTo64(file, (file64: string) => {
          updateAvatar({ newAvatar: file64 })
        })
      } else {
        dispatch(() => {} /*setAppError('File is too big')*/)
      }
    }
  }

  return (
    <label className={s.cameraIconLabel}>
      <input
        type="file"
        style={{ display: 'none' }}
        accept={'.png, .jpg, .jpeg, .gif'}
        onChange={uploadHandler}
      />
      <img className={s.cameraIcon} src={camera} alt="camera icon" />
    </label>
  )
}
