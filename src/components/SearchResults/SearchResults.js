import React, {useContext, useEffect, useReducer, useState} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {buildSearchParams} from '../../data-and-functions/searchParams'
import {Context} from '../../App'
import RestaurantCard from '../RestaurantCard'
import Pagination from './Pagination'

const SearchResults = () => {
	// State Variables
	// ===========================================================================================
	const {searchString} = useParams()
	const [searchParams] = useSearchParams()
	const {loggedInUser} = useContext(Context)
	const [restaurantsData, dispatchData] = useReducer(axiosReducer, {searchString: ''})
	const [currentPage, setCurrentPage] = useState(1)
	const cardsPerPage = 6

	useEffect(() => {
		let params = [],
			values = []
		for (const entry of searchParams.entries()) {
			// Pull out the paramater and value on each pass
			const [param, value] = entry
			// Push param and value into arrays on each pass
			params.push(param)
			values.push(value)
		}
		// Get restaurants that match search criteria
		axiosAll(
			'GET',
			`/restaurants/results/${searchString}${buildSearchParams(params, values)}`,
			loggedInUser.token,
			dispatchData
		)
	}, [])

	// Functions and Event Handlers
	// ===========================================================================================
	// Pagination
	// Getting cards on the current page
	const indexOfLastCard = currentPage * cardsPerPage
	const indexOfFirstCard = indexOfLastCard - cardsPerPage
	// Change page number
	const paginate = pageNumber => setCurrentPage(pageNumber)

	return (
		<div className='h-full w-full space-y-4'>
			{restaurantsData.response && restaurantsData.response.length !== 0 && (
				<>
					<div className='max-h-[810px] max-w-[335px] sm:max-w-[665px] lg:max-w-[970px] mx-auto grid justify-items-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-2 overflow-y-auto overflow-x-hidden scroll'>
						{restaurantsData.response
							.slice(indexOfFirstCard, indexOfLastCard)
							.map(restaurant => (
								<div className='main-bg h-[400px] w-[320px] p-2 grid place-items-center'>
									<RestaurantCard restaurant={restaurant._id} key={restaurant._id} />
								</div>
							))
						}
					</div>
					<Pagination
						cardsPerPage={cardsPerPage}
						totalCards={restaurantsData.response.length}
						paginate={paginate}
					/>
				</>
			)}
			{!restaurantsData.response && (
				<div>
					<h1>Loading restaurants...</h1>
				</div>
			)}
			{restaurantsData.response && restaurantsData.response.length === 0 && (
				<div className='centered'>
					<h1 className='text-white text-3xl'>No restaurants matching restaurants were found</h1>
				</div>
			)}
		</div>
	)
}

export default SearchResults
