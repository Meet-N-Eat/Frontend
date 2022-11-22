import {useEffect} from 'react'
import defaultImage from '../assets/defaultImage.png'
import {axiosAll} from '../data-and-functions/axiosAll'
import {Spinner} from 'react-bootstrap'
import useGlobalReducer from '../hooks/useGlobalReducer'
import useAuth from '../hooks/useAuth'

const ProfileCard = ({ user }) => {
	// State Hooks and Variables
	// ===========================================================================================
	const {loggedInUser} = useAuth()
	const [userInfo, dispatchUserInfo] = useGlobalReducer({})

	// Functions and Event Handlers
	// ===========================================================================================

	// get user by id call
	useEffect(() => {
		axiosAll('GET', `/users/${user}/profileCard`, loggedInUser.token, dispatchUserInfo)
	}, [])

	// Return
	// ===========================================================================================
	return (
		<div className='h-32 w-32 rounded-2xl flex-centered vertical'>
			{!userInfo.response && (
				<div className='p-4'>
					<Spinner animation='border' variant="light" /> 
				</div>
			)}
			{userInfo.response && (
				<>
					<div className='user-image mb-2'>
						<img
							src={userInfo.response.profileimg || defaultImage}
							alt='profile'
							className='user-image img'
						/>
					</div>
					<p className='text-center'>
						{userInfo.response.displayname || userInfo.response.username}
					</p>
				</>
			)}
		</div>
	)
}
export default ProfileCard
