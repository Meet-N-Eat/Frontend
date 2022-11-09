import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {Context} from '../App'

function OutreachButtons({friends, user, friendRequestHandler}) {
	const navigate = useNavigate()
	const {loggedInUser} = useContext(Context)

	const handleMessage = () => {
		navigate(`/messages/${user.id}`)
	}

	return (
		<div className='rounded-2xl'>
			{user._id !== loggedInUser.response._id &&
				(friends && friends === true ? (
					<button className='outreach-button' onClick={handleMessage}>
						<p className=''>Message {user.displayname || user.username}</p>
					</button>
				) : (
					<button className='outreach-button' onClick={friendRequestHandler}>
						Add {user.displayname || user.username} as friend
					</button>
				))}
		</div>
	)
}

export default OutreachButtons
