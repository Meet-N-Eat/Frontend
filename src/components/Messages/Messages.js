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
		<>
			<div className='h-[73px] standard-width max-w-[1080px] flex-centered relative mx-auto main-bg rounded-b-none'>
				<p className='m-auto'>conversations</p>
				<button className='absolute top-5 right-10 text-xl' onClick={toggleModal}>
					<FontAwesomeIcon className='' icon={faMessage} />
				</button>
			</div>
			<div className='h-max max-h-[80vh] standard-width max-w-[1080px] flex flex-col main-bg mx-auto p-4 rounded-t-none overflow-y-auto overflow-x-hidden md:gap-y-2 scroll'>
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
							className='w-full message-thread rounded-2xl hover:text-white'
							key={thread[thread.length - 1]._id}
							to={`/messages/${
								thread[0].sender != loggedInUser.response._id
									? thread[0].sender
									: thread[0].recipient
							}`}
						>
							<div className="mx-auto">
								<ProfileCard user={
									thread[0].sender != loggedInUser.response._id
										? thread[0].sender
										: thread[0].recipient
									}
								/>
							</div>
							<Message message={thread[thread.length - 1]} />
						</Link>
					))
				) : (
					<div>
						you don't have any messages, choose a friend from the list and start chatting!
					</div>
				)}
			</div>
		</>
	)
}

export default Messages
