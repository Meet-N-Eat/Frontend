import {useContext, useEffect, useReducer, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Modal, Spinner} from 'react-bootstrap'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import RestaurantCard from '../RestaurantCard'
import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import UserLike from './UserLike'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'

const RestaurantDetail = () => {
	// State hooks and variable declarations
	// ===========================================================================
	const [resDetails, dispatchRestaurant] = useReducer(axiosReducer, {})
	const [userLikes, dispatchLikes] = useReducer(axiosReducer, [])
	const {loggedInUser, dispatchUser} = useContext(Context)
	const {restaurantId} = useParams()
	const [modalShow, setModalShow] = useState(false)
	

	// Getting restaurant data by restaurantId
	// ===========================================================================
	useEffect(() => {
		// Update user state
		loggedInUser.token &&
			axiosAll('GET', `/users/${loggedInUser.response._id}`, loggedInUser.token, dispatchUser)
	}, [])

	useEffect(() => {
		// Get restaurant state
		axiosAll('GET', `/restaurants/${restaurantId}`, null, dispatchRestaurant)
		axiosAll('GET', `/restaurants/${restaurantId}/userLikes`, null, dispatchLikes)
		console.log('Get restaurant state')
	}, [])

	// Event Handler
	function handleShow() {
		setModalShow(!modalShow)
	}

	return (
		<div>
			{resDetails.response && userLikes.response ? (
				<div>
					<div>
						<RestaurantCard restaurant={resDetails.response._id} />
					</div>
					<div className='bg-white rounded-full horizontal justify-center py-1 w-[28rem]'>
						{loggedInUser.token ? (
							userLikes.response.slice(0,3).map(user => 
							<UserLike key={user._id} user={user} />)
						) : (
							<Link to='/users/authentication/login' state={{logInMessage: true}}>
								{userLikes.response.length} users like this restaurant
							</Link>
						)}
					</div>
					<div>
						<div>
							<div>
								{loggedInUser.token ? (
									<h4>reviews</h4>
								) : (
									<Link to='/users/authentication/login' state={{logInMessage: true}}>
										reviews
									</Link>
								)}
							</div>
						</div>
						{loggedInUser.token && (
							<>
								<Reviews restaurantId={resDetails.response._id} modalShow={modalShow} />
								<div>
									<button type='submit' onClick={handleShow}>
										write a review
									</button>
									<Modal
										show={modalShow}
										onHide={handleShow}
										size='md'
										aria-labelledby='likedrestaurants-modal'
										centered
									>
										<ReviewForm
											restaurantId={resDetails.response._id}
											handleShow={handleShow}
										/>
									</Modal>
								</div>
							</>
						)}
					</div>
				</div>
			) : (
				<Spinner animation='border' />
			)}
		</div>
	)
}

export default RestaurantDetail
