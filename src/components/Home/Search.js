import {useReducer, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getSearchParams} from '../../data-and-functions/searchParams'
import {searchCriteriaReducer} from '../../data-and-functions/searchCriteriaReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchFilters from './SearchFilters'

const Search = () => {
	// Initial state for searchCriteria
	// ===========================================================================
	const initialState = {
		searchString: '',
		city: '',
		category: '',
		price: '',
		wheelchairAccessible: '',
		openLate: '',
	}

	// State hooks and variable declarations
	// ===========================================================================
	const [searchCriteria, dispatch] = useReducer(searchCriteriaReducer, initialState)
	const [showFilters, setShowFilters] = useState(false)
	const navigate = useNavigate()

	// Event handlers
	// ===========================================================================
	function inputChange(e) {
		dispatch({
			key: 'searchString',
			value: e.target.value,
		})
	}

	function formSubmit(e) {
		e.preventDefault()
		const searchString = getSearchParams(searchCriteria)
		searchCriteria && navigate(searchString)
	}

	function filterClick() {
		setShowFilters(prev => !prev)
	}

	return (
		<div>
			<form onSubmit={formSubmit}>
				<div className='w-8/12 mx-auto grid grid-cols-5'>
					<div className='col-span-4'>
						<input
							className='w-full p-1 rounded'
							type='text'
							placeholder='search by restaurant or category'
							onChange={inputChange}
							value={searchCriteria.searchString}
						/>
					</div>
					<div>
						<button type='button' onClick={filterClick}>
							filters
						</button>
					</div>
				</div>
			</form>
			<SearchFilters
				searchCriteria={searchCriteria}
				dispatch={dispatch}
				filterClick={filterClick}
				showFilters={showFilters}
			/>
		</div>
	)
}

export default Search
