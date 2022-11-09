import {useContext} from 'react'
import {formatDateTime} from '../../data-and-functions/formatDateTime'
import {axiosAll} from '../../data-and-functions/axiosAll'
import {Context} from '../../App'
import ProfileCard from '../ProfileCard'

const FriendRequest = ({friendRequest, dispatchRequests}) => {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser} = useContext(Context)
	const [date, time] = formatDateTime(friendRequest.createdAt)

	// Event Handlers and Functions
	// ===========================================================================
	async function inviteHandler(choice) {
		// if accept was clicked, add new friend
		choice == 'accept' &&
			(await axiosAll(
				'POST',
				`/users/${loggedInUser.response._id}/friends/${friendRequest.sender}`,
				loggedInUser.token
			))

		// delete the friend request
		choice != '' &&
			(await axiosAll(
				'DELETE',
				`/users/${loggedInUser.response._id}/friendInvites/${friendRequest._id}`,
				loggedInUser.token
			))

		// update loggedInUser once the appropriate action has been taken
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/friendInvites`,
			loggedInUser.token,
			dispatchRequests
		)
	}

	// Return
	// ===========================================================================
	return (
		<div className='bg-white rounded-2xl flex flex-col md:flex-row p-2 h-80 md:h-40'>
			<div className='mx-auto md:flex-1'>
				<ProfileCard user={friendRequest.sender} />
			</div>
			<div className='p-2 text-center space-y-4 md:space-y-2'>
				<p className='max-h-7'>{friendRequest.body}</p>
				<div className='flex flex-col space-y-2 p-2'>
					<button className='account-button' onClick={() => inviteHandler('accept')}>
						accept
					</button>
					<button className='account-button' onClick={() => inviteHandler('decline')}>
						decline
					</button>
				</div>
			</div>
		</div>
	)
}

export default FriendRequest
