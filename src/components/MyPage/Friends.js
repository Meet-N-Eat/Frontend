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
			<div className='max-h-[600px] main-bg display-friends flex-centered scroll'>
				{friends.response && friends.response.length > 0 ? (
					friends.response
						.filter(
							friend =>
								searchCharacters === '' ||
								friend.username.toLowerCase().includes(searchCharacters.toLocaleLowerCase())
						)
						.map(friend => (
							<ProfileCard key={friend._id} user={friend._id}/>
						))
				) : (
					<p className='text-white col-span-4 text-center'>
						No friends yet! Send friend requests by clicking on other people
						who like the same restaurants you do.				
					</p>
				)}
			</div>
		</div>
	)
}

export default Friends
