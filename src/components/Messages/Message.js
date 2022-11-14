import {formatDateTime} from '../../data-and-functions/formatDateTime'

const Message = ({message}) => {
	const [date, time] = formatDateTime(message.createdAt)

	return (
		<div className='modal-bg text-white rounded-2xl flex p-2'>
			<div className='flex items-between w-full'>
				<div className='w-3/4 my-auto p-2'>
					<p className='base-text'>{message && message.body}</p>
				</div>
				<div className='w-1/4 vertical flex-centered'>
					<div className='base-text'>{message && date}</div>
					<div className='base-text'>{message && time}</div>
				</div>
			</div>
		</div>
	)
}

export default Message
