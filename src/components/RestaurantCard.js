import {useContext, useState, useEffect, useReducer} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Context} from '../App'
import {axiosAll, axiosReducer} from '../data-and-functions/axiosAll'

const RestaurantCard = ({restaurant, hideLikeButton}) => {
	// State Hooks and Variables
	// ===========================================================================

	const likedImage =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png'
	const notLikedImage = 'https://www.iconpacks.net/icons/1/free-heart-icon-492-thumb.png'
	const {colorTemplate, loggedInUser, dispatchUser} = useContext(Context)
	const navigate = useNavigate()

	const [resDetails, dispatchDetails] = useReducer(axiosReducer, {})
	const [buttonIcon, setButtonIcon] = useState(liked() ? likedImage : notLikedImage)
	const categories = []
	resDetails.response &&
		resDetails.response.categories.forEach(category => categories.push(category.title))

	useEffect(() => {
		axiosAll('GET', `/restaurants/${restaurant}`, null, dispatchDetails)
	}, [restaurant])

	// Functions
	// ===========================================================================
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
				`/users/${loggedInUser.response._id}`,
				loggedInUser.token,
				dispatchUser
			)

			setButtonIcon(liked() ? notLikedImage : likedImage)
		} else {
			navigate('/users/authentication/login', {state: {logInMessage: true}})
		}
	}

	// Return
	// ===========================================================================

	return (
		<div className='h-full w-[320px] relative'>
			{resDetails.response && (
				<>
					<div className='absolute top-0 right-0'>
						{
							// Hide like button if hideLikeButton is true
							!hideLikeButton && (
								<button type='checkbox' variant='outline-light'>
									<img width={50} src={buttonIcon} onClick={likeHandler} />
								</button>
							)
						}
					</div>
					<Link
						className='text-white hover:text-white text-center vertical items-center space-y-4'
						to={`/restaurants/${restaurant}`}
					>
						<p className='font-bold text-center mt-4'>{resDetails.response.name}</p>
						<img
							className='restaurant-image'
							src={resDetails.response.image_url}
							alt='restaurant-image'
						/>

							{/* <ul>
								<li>{resDetails.response.location.address1}</li>
								<li>
									{resDetails.response.location.city}, {resDetails.response.location.state}
								</li>
								<li>{resDetails.response.display_phone}</li>
							</ul> */}
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
