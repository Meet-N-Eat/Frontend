import {useContext, useEffect, useReducer} from 'react'
import {Spinner} from 'react-bootstrap'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import Review from './Review'

const Reviews = ({restaurantId, modalShow}) => {
	// State hooks and variable declarations
	// ===========================================================================
	const [reviews, dispatchReviews] = useReducer(axiosReducer, {})
	const {loggedInUser} = useContext(Context)

	useEffect(() => {
		axiosAll('GET', `/restaurants/${restaurantId}/reviews`, loggedInUser.token, dispatchReviews)
		console.log('Get reviews')
	}, [modalShow])

	return (
		<div className='w-full overflow-auto scroll'>
			{reviews.response ? (
				<div>
					{reviews.response.reviews &&
						reviews.response.reviews.map(review => (
							<Review review={review} key={review._id} />
						))}
				</div>
			) : (
				<Spinner animation='border' />
			)}
		</div>
	)
}

export default Reviews
