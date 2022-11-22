import {useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import {axiosAll} from '../../data-and-functions/axiosAll'
import Review from './Review'

const Reviews = ({restaurantId, toggle}) => {
	// State hooks and variable declarations
	// ===========================================================================
	const {loggedInUser} = useAuth()
	const [reviews, dispatchReviews] = useGlobalReducer({})

	useEffect(() => {
		axiosAll('GET', `/restaurants/${restaurantId}/reviews`, loggedInUser.token, dispatchReviews)
	}, [toggle])


	console.log(reviews)

	// Return
	//===========================================================================================
	return (
		<div className='w-full h-[300px] overflow-auto scroll'>
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
