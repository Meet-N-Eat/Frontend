import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import useAuth from '../../hooks/useAuth'
import {axiosAll} from '../../data-and-functions/axiosAll'
import toggleModal from '../../data-and-functions/toggleModal'
import {messageThreads} from '../../data-and-functions/messageThreads'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMessage} from '@fortawesome/free-solid-svg-icons'
import {Spinner} from 'react-bootstrap'
import Message from './Message'
import ProfileCard from '../ProfileCard'

function Messages() {
	// State Hooks and Variables
	// ===========================================================================	
	const {loggedInUser} = useAuth()
	const [messages, dispatchMessages] = useGlobalReducer({})
	const [toggle, setToggle] = useState(false)

	// Event Handlers and Functions
	// ===========================================================================	
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

	// Return
	// ===========================================================================	
	return (
		<div>
			<div className='h-[73px] standard-width flex-centered relative mx-auto main-bg rounded-b-none'>
				<p className='white-header m-auto'>conversations</p>
				<button className='absolute top-5 right-10 text-xl' onClick={() => setToggle(toggleModal())}>
					<FontAwesomeIcon className='' icon={faMessage} />
				</button>
			</div>
			<div className='h-max max-h-[440px] standard-width vertical main-bg mx-auto p-4 rounded-t-none overflow-y-auto md:gap-y-2 scroll'>
				{toggle && (
					<div className='modals' onClick={e => setToggle(toggleModal(e))}>
						<div className='modals-content display-friends'>
							{!loggedInUser.response && (
								<div className='m-auto'>
									<Spinner animation='border' variant='light' />
								</div>
							)}
							{loggedInUser.response &&
								loggedInUser.response.friends.map(friend => (
									<Link className='hover:text-red-600' key={friend} to={`/messages/${friend}`}>
										<ProfileCard user={friend} />
									</Link>
								))
							}
						</div>
					</div>
				)}
				{!messages.threadArray && (
					<div className='m-auto flex-centered p-8'>
						<Spinner animation='border' variant='light' />
					</div>
				)}
				{messages.threadArray && messages.threadArray.length === 0 && (
					<div className='mx-auto standard-width max-w-[1080px] flex-centered vertical space-y-2'>
						<p className='white-subheader'>you don't have any messages</p>
						<p className='text-center'>
							choose a friend from the list and start chatting
						</p>
					</div>
				)}
				{messages.threadArray &&
					messages.threadArray.length > 0 &&
					messages.threadArray.map(thread => (
						<Link
							className='w-full message-thread rounded-2xl hover:text-white hover:opacity-90 hover:duration-700'
							key={thread[thread.length - 1]._id}
							to={`/messages/${
								thread[0].sender !== loggedInUser.response._id
									? thread[0].sender
									: thread[0].recipient
							}`}
						>
							<div className='h-[100px] mx-auto'>
								<ProfileCard
									user={
										thread[0].sender !== loggedInUser.response._id
											? thread[0].sender
											: thread[0].recipient
									}
								/>
							</div>
							<Message message={thread[thread.length - 1]} />
						</Link>
					))
				}
			</div>
		</div>
	)
}

export default Messages
