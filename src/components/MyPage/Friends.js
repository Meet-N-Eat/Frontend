import {useState, useEffect} from 'react'
import {axiosAll} from '../../data-and-functions/axiosAll'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import {Spinner, Modal} from 'react-bootstrap'
import ProfileCard from '../ProfileCard'
import OutreachButtons from '../OutreachButtons'

const Friends = ({loggedInUser}) => {
	// State Hooks and Variables
	// ===========================================================================
	const [searchCharacters, setSearchCharacters] = useState('')
	const [friends, dispatchFriends] = useGlobalReducer({})
	const [setFormSwitch] = useState(false)
	const [show, setShow] = useState(false)
	const [current, setCurrent] = useState({
		_id: 123
	})


	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/friends`,
			loggedInUser.token,
			dispatchFriends
		)
	}, [])

	// Event Handlers and Functions
	// ===========================================================================

	function searchChange(e) {
		setSearchCharacters(e.target.value)
	}

	function modalHandler() {
		setShow(prevState => !prevState)
	}

	function areFriends() {
		if (loggedInUser.response.friends.find(friend => friend === current._id)) return true
		else return false
	}

	function friendRequestHandler() {
		setFormSwitch(prevState => !prevState)
	}

	// Return
	// ===========================================================================
	return (
		<div className='vertical flex-centered'>
			<form>
				<input className='input mb-8 base-text' onChange={searchChange} placeholder='search by name' />
			</form>
			<div className='main-bg display-friends flex-centered scroll'>
				{!friends.response && (
					<div className='p-4'>
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
								<div className='rounded-2xl' key={friend._id} onClick={() => {
									modalHandler()
									setCurrent(friend)
								}}>
									<ProfileCard user={friend._id}/>
								</div>
						))
				)}
				<Modal size='sm' show={show} onHide={() => setShow(false)} >
					<div className='h-auto w-72 modal-bg grid-centered border mt-36 mx-auto p-4'>
						<ProfileCard key={current._id} user={current._id}/>
						<p className='w-full pb-3 mb-2 text-center'>{current.about || 'new to meet-n-eat'}</p>
						<OutreachButtons
							friends={areFriends()}
							user={current}
							friendRequestHandler={friendRequestHandler}
						/>
					</div>
				</Modal>
				{friends.response && friends.response.length === 0 && (
					<p className='text-white base-text col-span-4 text-center p-4'>
						No friends yet! Send friend requests by clicking on other people
						who like the same restaurants you do		
					</p>
				)}
				
			</div>
		</div>
	)
}

export default Friends
