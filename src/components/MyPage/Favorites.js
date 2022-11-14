import {useState, useReducer, useEffect} from 'react'
import {Link} from 'react-router-dom'
import RestaurantCard from '../RestaurantCard'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {Spinner} from 'react-bootstrap'

const Favorites = ({loggedInUser}) => {
	// State Hooks and Variables
	// ===========================================================================================
	const [searchCharacters, setSearchCharacters] = useState('')
	const [favorites, dispatchFavorites] = useReducer(axiosReducer, {})

	// Functions and Event Handlers
	// ===========================================================================================
	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/favorites`,
			loggedInUser.token,
			dispatchFavorites
		)
	}, [])

	// Return
	// ===========================================================================
	return (
		<div className='likedRestaurants grid-centered w-full rounded-2xl'>
			<form className='horizontal flex-centered border-slate-200/60 pb-2 mb-2 w-full'>
				<input
					onChange={e => {
						setSearchCharacters(e.target.value)
					}}
					className='input'
					placeholder='search by name'
					aria-label="Search user's liked restaurants by name"
				/>
			</form>
			<>
			{!favorites.response && (
				<div className='main-bg p-4'>
					<Spinner animation='border' variant="light" /> 
				</div>
			)}
			</>
			<div className='responsive-mypage sm:max-w-[1050px] gap-2 grid-centered mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 overflow-y-auto scroll'>
				{favorites.response && favorites.response.length > 0 && (
					favorites.response
						.filter(
							restaurant =>
								searchCharacters === '' ||
								restaurant.name.toLowerCase().includes(searchCharacters.toLocaleLowerCase())
						)
						.map(restaurant => (
							<RestaurantCard key={restaurant._id} restaurant={restaurant._id} />
						))
				)}
			</div>
			{favorites.response && favorites.response.length === 0 && (
					<div className='main-bg w-[350px] md:w-96 p-4'>
						<Link to='/'>
							<button className='button w-full base-text text-center'>Browse restaurants to add to favorites</button>
						</Link>
					</div>
			)}
		</div>
	)
}

export default Favorites
