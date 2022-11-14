import {useState, useReducer, useEffect} from 'react'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import ProfileCard from '../ProfileCard'
import {Spinner} from 'react-bootstrap'

const Friends = ({loggedInUser}) => {
	// State Hooks and Variables
	// ===========================================================================================
	const [searchCharacters, setSearchCharacters] = useState('')
	const [friends, dispatchFriends] = useReducer(axiosReducer, {})


	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/friends`,
			loggedInUser.token,
			dispatchFriends
		)
	}, [])

	// Functions and Event Handlers
	// ===========================================================================================

	function searchChange(e) {
		setSearchCharacters(e.target.value)
	}

	// Return
	// ===========================================================================
	return (
		<div className='vertical flex-centered'>
			<form>
				<input className='input mb-8' onChange={searchChange} placeholder='search by name' />
			</form>
			<div className='max-h-[600px] display-friends flex-centered scroll'>
				{!friends.response && (
					<div className='py-4'>
						<Spinner animation='border' variant="light" /> 
					</div>
				)}
				{friends.response && friends.response.length > 0 && (
					friends.response
						.filter(
							friend =>
								searchCharacters === '' ||
								friend.username.toLowerCase().includes(searchCharacters.toLocaleLowerCase())
						)
						.map(friend => (
							<ProfileCard key={friend._id} user={friend._id}/>
						))
				)}
				{friends.response && friends.response.length === 0 && (
					<p className='text-white base-text col-span-4 text-center py-4'>
						No friends yet! Send friend requests by clicking on other people
						who like the same restaurants you do		
					</p>
				)}
				
			</div>
		</div>
	)
}

export default Friends
