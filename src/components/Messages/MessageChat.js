import {useEffect, useReducer, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {messageThreads} from '../../data-and-functions/messageThreads'
import ProfileCard from '../ProfileCard'
import Message from './Message'

function MessageChat() {
	const {loggedInUser} = useContext(Context)
	const {friendId} = useParams()

	const initialState = {
		sender: loggedInUser.response._id,
		recipient: friendId,
		body: '',
	}

	const [message, dispatchMessage] = useReducer(axiosReducer, initialState)
	const [thread, dispatchThread] = useReducer(axiosReducer, {})

	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/messages/${friendId}`,
			loggedInUser.token,
			dispatchThread
		)
	}, [])

	// sort messages into a chronological thread
	useEffect(() => {
		thread.response &&
			messageThreads(thread, loggedInUser).then(threadArray => {
				dispatchThread({
					key: 'threadArray',
					value: threadArray,
				})
			})
	}, [thread.response])

	async function submitHandler(e) {
		e.preventDefault()
		// create new message
		await axiosAll('POST', '/users/messages/new', loggedInUser.token, null, message)
		// reset local message state
		await dispatchMessage({
			key: 'initialize',
			value: initialState,
		})
		// update the thread to display the new message
		await axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/messages/${friendId}`,
			loggedInUser.token,
			dispatchThread
		)
	}

	return (
		<div>
			<div className='w-[375px] sm:w-full page-container main-bg items-center mx-auto rounded-b-none'>
				<ProfileCard user={friendId} />
			</div>
			<div className='h-[770px] w-[375px] sm:w-full page-container main-bg rounded-t-none gap-y-2 p-4 overflow-auto scroll'>
				{thread.threadArray && thread.threadArray.length > 0 ? (
					thread.threadArray[0].map(message => (
						<div
							key={message._id}
							className={`${
								message.sender == loggedInUser.response._id
									? 'user chat-message'
									: 'friend chat-message'
							}`}
						>
							<Message message={message} />
						</div>
					))
				) : (
					<div>no messages yet, say hi!</div>
				)}
			</div>
			<div className='block'>
				<form
					onSubmit={submitHandler}
					className='flex sm:mt-4 mx-auto w-[90%] min-w-[375px] max-w-[700px] space-x-2'
				>
					<input
						className='input w-full'
						type='text'
						onChange={e => dispatchMessage({key: 'body', value: e.target.value})}
						value={message.body}
					/>
					<button className='button' type='submit'>
						send
					</button>
				</form>
			</div>
		</div>
	)
}

export default MessageChat
