import {useContext, useEffect, useReducer, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Modal, Spinner} from 'react-bootstrap'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import RestaurantCard from '../RestaurantCard'
import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import UserLike from './UserLike'

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
		<div className='centered overflow-auto min-h-[820px] scroll'>
			{resDetails.response && userLikes.response ? (
				<div className='w-3/4 centered'>
					<div>
						<RestaurantCard restaurant={resDetails.response._id} />
					</div>

					<div className='bg-white p-2 border-t-[1px] border-b-[1px] border-red-900 w-[25rem] mt-3 flex flex-row centered rounded-full'>
						{loggedInUser.token ? (
							userLikes.response.slice(0,3).map(user => 
							<UserLike key={user._id} user={user} />)
						) : (
							<Link to='/users/authentication/login' state={{logInMessage: true}}>
								{userLikes.response.length} users like this restaurant
							</Link>
						)}
					</div>
					<div className='w-full'>
						<div>
							<div>
								{loggedInUser.token ? (
									<h4 className='centered font-normal text-white'>reviews</h4>
								) : (
									<Link to='/users/authentication/login' state={{logInMessage: true}}>
										reviews
									</Link>
								)}
							</div>
						</div>
						{loggedInUser.token && (
							<div className="centered p-2">
								<Reviews restaurantId={resDetails.response._id} modalShow={modalShow} />
								<div>
									<button className='button mt-2' type='submit' onClick={handleShow}>
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
							</div>
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
