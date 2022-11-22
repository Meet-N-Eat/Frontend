import {useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import {axiosAll} from '../../data-and-functions/axiosAll'
import {formatDateTime} from '../../data-and-functions/formatDateTime'
import useAuth from '../../hooks/useAuth'
import useGlobalReducer from '../../hooks/useGlobalReducer'

const Review = ({review}) => {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser} = useAuth()
	const [reviewer, dispatch] = useGlobalReducer({response: null})
	const [date, time] = formatDateTime(review.createdAt)

	// Event Handlers and Functions
	// ===========================================================================
	useEffect(() => {
		axiosAll('GET', `/users/${review.reviewer}/profileCard`, loggedInUser.token, dispatch)
	}, [])

	// Return
	// ===========================================================================
	return (
		<div>
			{reviewer.response ? (
				<ul className='horizontal justify-between items-center main-bg m-1 border'>
					<li className='min-h-[70px] max-w-[90px] p-2 text-white base-text rounded-tl-2xl rounded-bl-2xl '>
						{reviewer.response.displayname || reviewer.response.username}
					</li>
					<li className='w-3/4 min-h-[70px] flex items-center text-white base-text'>
						{review.body}
					</li>
					<div className='p-1'>
						<li>{'☆'.repeat(review.stars)}</li>
						<li className='min-h-[70px] float-right max-w-[100px] grid-centered text-white base-text rounded-br-2xl rounded-tr-2xl'>{`${date} ${time}`}</li>
					</div>
				</ul>
			) : (
				<div className='text-center p-4'>
					<Spinner animation='border' variant='light' />
				</div>
			)}
		</div>
	)
}

export default Review
