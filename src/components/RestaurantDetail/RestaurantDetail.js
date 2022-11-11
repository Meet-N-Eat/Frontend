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
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'

const RestaurantDetail = () => {
	// State hooks and variable declarations
	// ===========================================================================
	const [resDetails, dispatchRestaurant] = useReducer(axiosReducer, {})
	const [userLikes, dispatchLikes] = useReducer(axiosReducer, [])
	const {loggedInUser, dispatchUser} = useContext(Context)
	const {restaurantId} = useParams()
	const [modalShow, setModalShow] = useState(false)
	const [limit, setLimit] = useState(3)
	const [showHideIcon, setShowHideIcon] = useState(faCirclePlus)

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
		<div className='grid-centered overflow-auto min-h-[820px] scroll'>
			{resDetails.response && userLikes.response ? (
				<div className='w-[450px] sm:w-3/4 grid-centered'>
					<div className='w-full flex flex-col items-center justify-center main-bg'>
						<RestaurantCard restaurant={resDetails.response._id} />
						<div className='flex justify-center items-center mb-2 text-black'>
							<div className={'white-bg p-2 border-t-[1px] border-b-[1px] border-red-900 mt-3 flex w-[25rem] horizontal grid-centered rounded-full overflow-x-auto scroll'}>
								{loggedInUser.token ? (
									userLikes.response.slice(0,limit).map(user => 
									<UserLike key={user._id} user={user} />)
								) : (
									<Link to='/users/authentication/login' state={{logInMessage: true}}>
										{userLikes.response.length} users like this restaurant
									</Link>
								)}
							</div>
							{userLikes.response.length > 3 ? <FontAwesomeIcon icon={showHideIcon} className="text-red-900 hover:text-gray-900/80 text-4xl bg-white rounded-full" onClick={() => {
								if(showHideIcon == faCircleMinus){
									setLimit(3)
									setShowHideIcon(faCirclePlus)
								}
								if(showHideIcon == faCirclePlus){
									setLimit(userLikes.response.length)
									setShowHideIcon(faCircleMinus)
								} 
							}}></FontAwesomeIcon> : ''}
						</div>
					</div>
					<div className='w-full border-2 border-red-900 rounded-2xl m-2'>
						<div>
							<div>
								{loggedInUser.token ? (
									<h4 className='grid-centered white-header'>reviews</h4>
								) : (
									<Link to='/users/authentication/login' state={{logInMessage: true}}>
										reviews
									</Link>
								)}
							</div>
						</div>
						{loggedInUser.token && (
							<div className="grid-centered p-2">
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
										centered={true}
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
