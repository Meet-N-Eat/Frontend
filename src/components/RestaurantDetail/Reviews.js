import {useContext, useEffect, useReducer} from 'react'
import {Spinner} from 'react-bootstrap'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import Review from './Review'

const Reviews = ({restaurantId, toggleModal}) => {
	// State hooks and variable declarations
	// ===========================================================================
	const [reviews, dispatchReviews] = useReducer(axiosReducer, {})
	const {loggedInUser} = useContext(Context)

	useEffect(() => {
		axiosAll('GET', `/restaurants/${restaurantId}/reviews`, loggedInUser.token, dispatchReviews)
	}, [toggleModal])

	// Return
	//===========================================================================================
	return (
		<div className='w-full overflow-auto scroll'>
			{!reviews.response && (
				<div className='grid-centered p-4'>
					<Spinner animation='border' variant="light" />
				</div>
			)}
			{reviews.response && reviews.response.reviews.length > 0 && (
				<div>
					{reviews.response.reviews &&
						reviews.response.reviews.map(review => (
							<Review review={review} key={review._id} />
						))}
				</div>
			)} 
			{reviews.response && reviews.response.reviews.length === 0 && (
				<div className='grid-centered'>
					<p className='text-white base-text'>No reviews yet</p>
				</div>
			)}
		</div>
	)
}

export default Reviews
