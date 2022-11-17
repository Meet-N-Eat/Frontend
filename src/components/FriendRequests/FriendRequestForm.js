import React, {useContext, useReducer} from 'react'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {Context} from '../../App'
import {Spinner} from 'react-bootstrap'

function FriendRequestForm({user, friendRequestHandler}) {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser} = useContext(Context)
	const initialState = {
		sender: loggedInUser.response._id,
		body: '',
	}
	const [request, dispatch] = useReducer(axiosReducer, initialState)

	// Event Handlers and Functions
	// ===========================================================================
	const handleChange = e => {
		dispatch({
			key: 'body',
			value: e.target.value,
		})
	}

	const handleSubmit = () => {
		axiosAll(
			'POST',
			`/users/${user._id}/friendInvites`,
			loggedInUser.token,
			null,
			request
		)
		friendRequestHandler()
	}

	// Return
	// ===========================================================================
	return (
		<div className='modals' onClick={friendRequestHandler}>
			<div className='modals-content w-80 md:w-4/5 space-y-4 p-2'>
				{user && user.username ? (
					<>
						<p className='white-header text-white text-center'>
							Add {user.username} as friend
						</p>
						<input
							className='input w-full base-text'
							as='textarea'
							divs={3}
							placeholder='Send an optional message'
							maxlength='200'
							onChange={handleChange}
						></input>
						<p className='text-slate-300 p-2 text-xs md:text-sm'>
							maximum length: 200 characters
						</p>
						<div className='grid-centered mb-4'>
							<button className='account-button' onClick={handleSubmit}>
								Add friend
							</button>
						</div>
					</>
				) : (
					<Spinner animation='border' variant='light' />
				)}
			</div>
		</div>
	)
}
export default FriendRequestForm
