import React, {useContext, useEffect, useReducer, useState} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {buildSearchParams} from '../../data-and-functions/searchParams'
import {Context} from '../../App'
import RestaurantCard from '../RestaurantCard'
import Pagination from './Pagination'
import {Spinner} from 'react-bootstrap'

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
					<div className='h-[732px] max-h-[440px] sm:max-h-[732px] w-[350px] md:w-[695px] xl:w-[1024px] mx-auto grid justify-items-start grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 gap-2 overflow-y-auto scroll'>
						{restaurantsData.response
							.slice(indexOfFirstCard, indexOfLastCard)
							.map(restaurant => (
								<div key={restaurant._id} className='main-bg grid-centered p-2 w-[335px] h-[360px]'>
									<RestaurantCard restaurant={restaurant._id} />
								</div>
							))}
					</div>
					<Pagination
						cardsPerPage={cardsPerPage}
						totalCards={restaurantsData.response.length}
						paginate={paginate}
					/>
				</>
			)}
			{!restaurantsData.response && (
				<div className='grid-centered mt-[20vh]'>
					<Spinner animation='border' variant='light' />
				</div>
			)}
			{restaurantsData.response && restaurantsData.response.length === 0 && (
				<div className='h-12 main-bg grid-centered standard-width text-center mx-auto mt-[20vh]'>
					<h1 className='text-white text-xl md:text-3xl mx-auto'>
						No matching restaurants were found
					</h1>
				</div>
			)}
		</div>
	)
}

export default SearchResults
