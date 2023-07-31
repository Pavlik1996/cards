import { Link } from 'react-router-dom'

import logOutImage from '../../../assets/imgs/logout.svg'
import userImage from '../../../assets/imgs/user.svg'

import s from './HeaderModal.module.css'
import { useActions } from '../../../common/utils/hooks/useActions'
import { authThunks } from '../../auth/auth-slice'

export const HeaderModal = () => {
	const { signOut } = useActions(authThunks)

	const logoutHandler = () => signOut()

	return (
		<div className={s.wrapper}>
			<Link to={'/profile'} className={s.link}>
				<img src={userImage} alt={'image user'} />
				Profile
			</Link>
			<button className={s.btn} onClick={logoutHandler}>
				<img src={logOutImage} alt='logout' />
				Logout
			</button>
		</div>
	)
}
