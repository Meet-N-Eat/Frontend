import {useState, useReducer, useEffect} from 'react'
import RestaurantCard from '../RestaurantCard'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'

const Favorites = ({loggedInUser}) => {
	const [searchCharacters, setSearchCharacters] = useState('')
	const [favorites, dispatchFavorites] = useReducer(axiosReducer, {})

	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/favorites`,
			loggedInUser.token,
			dispatchFavorites
		)
	}, [])

	return (
		<div className='likedRestaurants grid-centered w-full rounded-2xl'>
			<form className='horizontal flex-centered border-slate-200/60 pb-2 mb-2 w-full'>
				<p id='basic-addon2' className='text-white mr-2'>
					enter name
				</p>
				<input
					onChange={e => {
						setSearchCharacters(e.target.value)
					}}
					className='input'
					placeholder='liked restaurants'
					aria-label="Recipient's username"
					aria-describedby='basic-addon2'
				/>
			</form>
			<div className='w-full max-h-[720px] max-w-[335px] sm:max-w-[1050px] gap-2 grid-centered mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 overflow-y-auto scroll'>
				{favorites.response && favorites.response.length > 0 ? (
					favorites.response
						.filter(
							restaurant =>
								searchCharacters == '' ||
								restaurant.name.toLowerCase().includes(searchCharacters.toLocaleLowerCase())
						)
						.map(restaurant => (
							<RestaurantCard key={restaurant._id} restaurant={restaurant._id} />
						))
				) : (
					<div>add favorites by clicking on the heart icon of a restaurant</div>
				)}
			</div>
		</div>
	)
}

export default Favorites
