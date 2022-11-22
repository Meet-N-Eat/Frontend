import {useEffect} from 'react'
import {axiosAll} from '../../data-and-functions/axiosAll'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import useAuth from '../../hooks/useAuth'
import {Spinner} from 'react-bootstrap'
import FriendRequest from './FriendRequest'

function FriendRequests() {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser} = useAuth()
	const [friendRequests, dispatchRequests] = useGlobalReducer([])

	// Event Handlers and Functions
	// ===========================================================================
	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/friendInvites`,
			loggedInUser.token,
			dispatchRequests
		)
	}, [])

	// Return
	// ===========================================================================
	return (
		<div className='flex items-center justify-center row-start-2'>
			<div className='main-bg opacity-90 rounded-2xl px-6 md:px-14 py-4 space-y-4 w-80 md:w-[36rem] max-h-96 md:max-h-[80vh] overflow-y-auto scroll'>
				{loggedInUser.token && !friendRequests.response && (
					<div className='main-bg grid-centered p-4'>
						<Spinner animation='border' variant='light' />
					</div>
				)}
				{loggedInUser.token &&
					friendRequests.response &&
					friendRequests.response.length > 0 &&
					friendRequests.response.map(friendRequest => (
						<FriendRequest
							key={friendRequest._id}
							friendRequest={friendRequest}
							dispatchRequests={dispatchRequests}
						/>
					))}
				{loggedInUser.token &&
					friendRequests.response &&
					friendRequests.response.length === 0 && (
						<p className='text-center text-white text-sm md:text-base'>
							No current friend requests
						</p>
					)}
			</div>
		</div>
	)
}

export default FriendRequests
