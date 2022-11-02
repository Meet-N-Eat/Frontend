import {useReducer, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {getSearchParams} from '../../data-and-functions/searchParams'
import {searchCriteriaReducer} from '../../data-and-functions/searchCriteriaReducer'
import { hideModal } from '../../data-and-functions/hideModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
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

	useEffect(() => hideModal(setShowFilters), [])

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
				<div className='w-8/12 mx-auto flex space-x-2'>
					<div className='w-full'>
						<input
							className='input w-full border border-white'
							type='text'
							placeholder='search by restaurant or category'
							onChange={inputChange}
							value={searchCriteria.searchString}
						/>
					</div>
					<div className='place-self-end'>
						<button type='button' onClick={filterClick}>
							<FontAwesomeIcon icon={faSliders} className='icon h-8' />
						</button>
					</div>
				</div>
			</form>
			{showFilters &&
				<SearchFilters
					searchCriteria={searchCriteria}
					dispatch={dispatch}
				/>
			}
		</div>
	)
}

export default Search
