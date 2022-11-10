import {useState, useReducer, useEffect} from 'react'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import ProfileCard from '../ProfileCard'

const Friends = ({loggedInUser}) => {
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

	function searchChange(e) {
		setSearchCharacters(e.target.value)
	}

	return (
		<div className='vertical flex-centered'>
			<form>
				<input className='input mb-8' onChange={searchChange} placeholder='search by name' />
			</form>
			<div className='main-bg rounded-2xl grid grid-cols-2 my-auto place-content-center md:grid-cols-4 pt-48 md:pt-16 space-y-0 md:space-y-4 max-h-[23rem] text-xs md:text-base w-60 md:w-[52rem] overflow-y-auto scroll'>
				{friends.response && friends.response.length > 0 ? (
					friends.response
						.filter(
							friend =>
								searchCharacters === '' ||
								friend.username.toLowerCase().includes(searchCharacters.toLocaleLowerCase())
						)
						.map(friend => (
							<div className='text-white grid md:place-content-center'>
								<ProfileCard key={friend._id} user={friend._id} />
							</div>
						))
				) : (
					<div>
						you don't have any friends yet, send friend requests by clicking on other people
						who like the same restaurants you do.
					</div>
				)}
			</div>
		</div>
	)
}

export default Friends
