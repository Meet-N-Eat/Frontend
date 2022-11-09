import {useEffect, useContext, useReducer, useState} from 'react'
import {Link} from 'react-router-dom'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {messageThreads} from '../../data-and-functions/messageThreads'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMessage} from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import ProfileCard from '../ProfileCard'

function Messages() {
	const {loggedInUser} = useContext(Context)
	const [messages, dispatchMessages] = useReducer(axiosReducer, {})
	const [toggle, setToggle] = useState(false)

	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/messages/all`,
			loggedInUser.token,
			dispatchMessages
		)
	}, [])

	useEffect(() => {
		messages.response &&
			messageThreads(messages, loggedInUser).then(threadArray => {
				dispatchMessages({
					key: 'threadArray',
					value: threadArray,
				})
			})
	}, [messages.response])

	function toggleModal() {
		setToggle(prev => !prev)
	}

	return (
		<div className='flex-centered flex-col relative main-bg h-min max-h-[80%] w-full md:w-3/4 max-w-[1080px] mx-auto p-4 rounded-2xl overflow-y-auto overflow-x-hidden scroll'>
			<button className='text-xl absolute top-2 right-4' onClick={toggleModal}>
				<FontAwesomeIcon className='' icon={faMessage} />
			</button>
			{toggle && (
				<div className='modals' onClick={toggleModal}>
					<div className='modals-content display-friends'>
						{loggedInUser.response &&
							loggedInUser.response.friends.map(friend => (
								<Link key={friend} to={`/messages/${friend}`}>
									<ProfileCard user={friend} />
								</Link>
							))}
					</div>
				</div>
			)}
			{messages.threadArray && messages.threadArray.length > 0 ? (
				messages.threadArray.map(thread => (
					<Link
						className='flex flex-col w-full p-1 rounded-xl'
						key={thread[thread.length - 1]._id}
						to={`/messages/${
							thread[0].sender != loggedInUser.response._id
								? thread[0].sender
								: thread[0].recipient
						}`}
					>
						<Message message={thread[thread.length - 1]} />
					</Link>
				))
			) : (
				<div>
					you don't have any messages, choose a friend from the list and start chatting!
				</div>
			)}
		</div>
	)
}

export default Messages
