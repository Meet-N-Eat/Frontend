import {useContext, useEffect, useReducer, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import toggleModal from '../../data-and-functions/toggleModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlus, faCircleMinus} from '@fortawesome/free-solid-svg-icons'
import RestaurantCard from '../RestaurantCard'
import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import UserLike from './UserLike'

const RestaurantDetail = () => {
	// State Hooks and Variables
	// ===========================================================================
	const [resDetails, dispatchRestaurant] = useReducer(axiosReducer, {})
	const [userLikes, dispatchLikes] = useReducer(axiosReducer, [])
	const {loggedInUser, dispatchUser} = useContext(Context)
	const {restaurantId} = useParams()
	const [toggle, setToggle] = useState(false)
	const [limit, setLimit] = useState(3)
	const [showHideIcon, setShowHideIcon] = useState(faCirclePlus)

	// Event Handlers and Functions
	// ===========================================================================
	useEffect(() => {
		// Update user state
		loggedInUser.token &&
			axiosAll(
				'GET',
				`/users/${loggedInUser.response._id}`,
				loggedInUser.token,
				dispatchUser
			)

		// Get restaurant state
		axiosAll('GET', `/restaurants/${restaurantId}`, null, dispatchRestaurant)
		axiosAll('GET', `/restaurants/${restaurantId}/userLikes`, null, dispatchLikes)
	}, [])

	// Return
	// ===========================================================================	
	return (
		<div className='grid-centered min-h-[820px]'>
			{!resDetails.response && (
				<div className='p-4'>
					<Spinner animation='border' variant="light" />
				</div>
			)}
			{resDetails.response && userLikes.response && (
				<div className='sm:w-3/4 grid-centered'>
					<div className='flex flex-col items-center justify-center main-bg w-[335px] sm:w-full rounded-bl-[0] rounded-br-[0]'>
						<div className='flex flex-col md:flex-row justify-center items-center'>
							<RestaurantCard restaurant={resDetails.response._id} />
							<div className='flex flex-col md:h-[250px] md:justify-center items-center'>
								<p>{resDetails && resDetails.response.location.address1}</p>
								<p className='md:m-4'>{resDetails.response.location.city}, {resDetails.response.location.state}</p>
								<p>Phone: {resDetails.response.display_phone}</p>
							</div>
						</div>
						{userLikes.response.length === 0 ? (
								<div className='main-bg'></div>
						) : (
						<div className='flex-centered mb-2 text-black'>
							<div
								className={
									'white-bg px-2 mt-3 flex w-[250px] sm:w-[25rem] horizontal grid-centered rounded-full overflow-x-auto scroll'
								}
							>
								{loggedInUser.token && userLikes.response.length > 0 && (
									userLikes.response
										.slice(0, limit)
										.map(user => <UserLike key={user._id} user={user} />)
								)} 
								{userLikes.response.length > 0 && !loggedInUser.token && (
									<Link to='/users/authentication/login' state={{logInMessage: true}}>
											<p className='base-text text-black hover:font-normal'>{userLikes.response.length} users like this restaurant</p>
									</Link>
								)}
							</div>
							{userLikes.response.length > 3 ? (
								<FontAwesomeIcon
									icon={showHideIcon}
									className='text-red-900 hover:text-gray-900/80 text-4xl bg-white ml-1 rounded-full'
									onClick={() => {
										if (showHideIcon === faCircleMinus) {
											setLimit(3)
											setShowHideIcon(faCirclePlus)
										}
										if (showHideIcon === faCirclePlus) {
											setLimit(userLikes.response.length)
											setShowHideIcon(faCircleMinus)
										}
									}}
								></FontAwesomeIcon>
							) : (
								''
							)}
						</div>
						)}
					</div>
					<div className='w-[335px] sm:w-full main-bg rounded-tr-[0] rounded-tl-[0]'>
						<div>
							<div>
								{loggedInUser.token ? (
									<h4 className='grid-centered white-header'>reviews</h4>
								) : (
									<Link to='/users/authentication/login' state={{logInMessage: true}}>
										<p className='white-subheader grid-centered py-2 hover:font-normal'>See reviews</p>
									</Link>
								)}
							</div>
						</div>
						{loggedInUser.token && (
							<div className='grid-centered p-2'>
								<Reviews restaurantId={resDetails.response._id} toggle={toggle} />
								<div>
									<button
										className='button my-2 base-text'
										type='submit'
										onClick={(e) => setToggle(toggleModal(e))}
									>
										write a review
									</button>
									{toggle && (
										<div className='modals' onClick={e => setToggle(toggleModal(e))}>
											<ReviewForm
												restaurantId={resDetails.response._id}
												setToggle={setToggle}
											/>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default RestaurantDetail
