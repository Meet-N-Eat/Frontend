import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {axiosAll} from '../data-and-functions/axiosAll'
import useGlobalReducer from '../hooks/useGlobalReducer'
import useAuth from '../hooks/useAuth'
import {Spinner} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons'

const RestaurantCard = ({restaurant, hideLikeButton}) => {
	// State Hooks and Variables
	// ===========================================================================================
	const likedImage = <FontAwesomeIcon className='text-red-500/70' icon={faHeart} />
	const notLikedImage = <FontAwesomeIcon className='text-red-500/70' icon={regularHeart} />
	const {loggedInUser, dispatchUser} = useAuth()
	const navigate = useNavigate()
	const [resDetails, dispatchDetails] = useGlobalReducer({})
	const [buttonIcon, setButtonIcon] = useState(liked() ? likedImage : notLikedImage)
	const categories = []
	resDetails.response &&
		resDetails.response.categories.forEach(category => categories.push(category.title))

	useEffect(() => {
		axiosAll('GET', `/restaurants/${restaurant}`, null, dispatchDetails)
	}, [restaurant])

	// Functions and Event Handlers
	// ===========================================================================================
	function liked() {
		if (
			loggedInUser.response &&
			loggedInUser.response.favorites.find(favorite => favorite === restaurant)
		)
			return true
		else return false
	}

	async function likeHandler() {
		if (loggedInUser.token) {
			// Add or delete based on whether restaurant is already a favorite
			const callArgs = liked()
				? ['DELETE', `/users/${loggedInUser.response._id}/favorites/${restaurant}`]
				: ['POST', `/users/${loggedInUser.response._id}/favorites/${restaurant}`]
			const [method, path] = callArgs

			await axiosAll(method, path, loggedInUser.token)
			await axiosAll(
				'GET',
				`/users/id/${loggedInUser.response._id}`,
				loggedInUser.token,
				dispatchUser
			)

			setButtonIcon(liked() ? notLikedImage : likedImage)
		} else {
			navigate('/users/authentication/login', {state: {logInMessage: true}})
		}
	}

	// Return
	//===========================================================================================

	return (
		<div className='h-full w-[320px] relative'>
			{!resDetails.response && (
				<div className='text-center p-4'>
					<Spinner animation='border' variant='light' />
				</div>
			)}
			{resDetails.response && (
				<>
					<div className='absolute top-2 right-5'>
						{
							// Hide like button if hideLikeButton is true
							!hideLikeButton && (
								<button className='text-3xl' type='checkbox' onClick={likeHandler}>
									{buttonIcon}
								</button>
							)
						}
					</div>
					<Link
						className='text-white hover:text-white text-center vertical items-center space-y-4'
						to={`/restaurants/${restaurant}`}
					>
						<p className='font-bold text-center mt-4 w-[210px]'>
							{resDetails.response.name}
						</p>
						<img
							className='restaurant-image'
							src={resDetails.response.image_url}
							alt='restaurant'
						/>
						<div className='space-y-1'>
							<ul>
								{categories.map((category, index) => (
									<li key={index}>{category}</li>
								))}
							</ul>
							<p>{resDetails.response.price || 'pricing unavailable'}</p>
						</div>
					</Link>
				</>
			)}
		</div>
	)
}

export default RestaurantCard
