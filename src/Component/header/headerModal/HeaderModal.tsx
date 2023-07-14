import { Link } from 'react-router-dom'

import userImage from '../../../assets/imgs/user.svg'

import s from './HeaderModal.module.css'

export const HeaderModal = () => {
  return (
    <div className={s.wrapper}>
      <Link to={'/profile'}>
        <img src={userImage} alt="image user" />
        Profile
      </Link>
      <span>Logout</span>
    </div>
  )
}
