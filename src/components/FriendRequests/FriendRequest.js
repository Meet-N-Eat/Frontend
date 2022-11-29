import useAuth from '../../hooks/useAuth'
import {axiosAll} from '../../data-and-functions/axiosAll'
import ProfileCard from '../ProfileCard'

const FriendRequest = ({friendRequest, dispatchRequests}) => {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser} = useAuth()

	// Event Handlers and Functions
	// ===========================================================================
	async function inviteHandler(choice) {
		// if accept was clicked, add new friend
		choice === 'accept' &&
			(await axiosAll(
				'POST',
				`/users/${loggedInUser.response._id}/friends/${friendRequest.sender}`,
				loggedInUser.token
			))

		// delete the friend request
		choice !== '' &&
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
		<>
			<div className='white-bg rounded-2xl vertical md:flex-row p-2 max-h-92 md:h-52'>
				<div className='m-auto md:flex-1 red-subheader font-normal'>
					<ProfileCard user={friendRequest.sender} />
				</div>
				<div className='p-2 w-full space-y-3 md:space-y-2 m-auto'>
					<p className='px-2 py-1 base-text text-black shadow-inner shadow-red-900 rounded-2xl h-32 overflow-y-auto scroll'>
						{friendRequest.body !== ''
							? friendRequest.body
							: "Hi, let's be friends!"}
					</p>
				</div>
			</div>
			<div className='space-x-2 flex-centered mx-auto'>
				<button
					className='account-button base-text text-center'
					onClick={() => inviteHandler('accept')}
				>
					accept
				</button>
				<button
					className='account-button base-text text-center'
					onClick={() => inviteHandler('decline')}
				>
					decline
				</button>
			</div>
		</>
	)
}

export default FriendRequest
