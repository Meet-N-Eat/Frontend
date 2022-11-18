import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {Context} from '../App'

function OutreachButtons({user, friends, setToggle}) {
	const navigate = useNavigate()
	const {loggedInUser} = useContext(Context)

	const handleMessage = () => {
		navigate(`/messages/${user.id}`)
	}

	return (
		<div className='rounded-2xl'>
			{user._id !== loggedInUser.response._id &&
				(friends ? (
					<button className='outreach-button' onClick={handleMessage}>
						<p className='base-text'>Message {user.displayname || user.username}</p>
					</button>
				) : (
					<button className='outreach-button' onClick={() => setToggle(true)}>
						Add {user.displayname || user.username} as friend
					</button>
				))}
		</div>
	)
}

export default OutreachButtons
