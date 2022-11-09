import {useEffect, useReducer, useContext} from 'react'
import defaultImage from '../assets/defaultImage.png'
import {axiosAll, axiosReducer} from '../data-and-functions/axiosAll'
import {Context} from '../App'

const ProfileCard = ({user, modalShow}) => {
	const {loggedInUser} = useContext(Context)
	const [userInfo, dispatchUserInfo] = useReducer(axiosReducer, {})

	// get user by id call
	useEffect(() => {
		axiosAll('GET', `/users/${user}/profileCard`, loggedInUser.token, dispatchUserInfo)
	}, [])

	return (
		<div className='h-32 w-32 rounded-2xl flex-centered flex-col mx-auto'>
			{userInfo.response && (
				<>
					<div className='user-image mb-2'>
						<img
							src={userInfo.response.profileimg || defaultImage}
							alt='profile'
							className='user-image img'
						/>
					</div>
					<p className={modalShow == true ? `text-white text-center'` : 'text-center'}>
						{userInfo.response.displayname || userInfo.response.username}
					</p>
				</>
			)}
		</div>
	)
}
export default ProfileCard
