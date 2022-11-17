import {useContext, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {Context} from '../../App'
import FriendRequestForm from '../FriendRequests/FriendRequestForm'
import OutreachButtons from '../OutreachButtons'
import ProfileCard from '../ProfileCard'

function UserLike({user}) {
	// State Hooks and Variables
	// ===========================================================================================
	const {loggedInUser} = useContext(Context)
	const [formSwitch, setFormSwitch] = useState(false)
	const [show, setShow] = useState(false)

	// Functions and Event Handlers
	// ===========================================================================================

	function friends() {
		if (loggedInUser.response.friends.find(friend => friend === user._id)) return true
		else return false
	}

	function friendRequestHandler(e) {
		if (formSwitch) {
			if (e.target.className.includes('modals') && !e.target.className.includes('content'))
				setFormSwitch(prevState => !prevState)
		} else setFormSwitch(prevState => !prevState)
	}

	// Return
	//===========================================================================================
	return (
		<div>
			<div onClick={() => setShow(true)}>
				<ProfileCard user={user._id} />
			</div>
			<Modal size='sm' show={show} onHide={() => setShow(false)}>
				{!formSwitch ? (
					<div className='h-auto w-72 modal-bg grid-centered border mt-36 mx-auto p-4'>
						<div className='grid place-content-center'>
							<ProfileCard user={user._id} />
						</div>
						<p className='text-white mb-2'>{user.about}</p>
						<OutreachButtons
							friends={friends()}
							user={user}
							friendRequestHandler={friendRequestHandler}
						/>
					</div>
				) : (
					<FriendRequestForm user={user} friendRequestHandler={friendRequestHandler} />
				)}
			</Modal>
		</div>
	)
}

export default UserLike
