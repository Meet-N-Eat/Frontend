import {useReducer, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {getSearchParams} from '../../data-and-functions/searchParams'
import {searchCriteriaReducer} from '../../data-and-functions/searchCriteriaReducer'
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
	const [toggle, setToggle] = useState(false)
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

	function toggleModal(e) {
		if(toggle) {
			if(e.target.className.includes('modals') && !e.target.className.includes('content'))
				setToggle(prev => !prev)
		} 
		else setToggle(prev => !prev)	
	}

	return (
		<div>
			<form onSubmit={formSubmit}>
				<div className='w-8/12 mx-auto flex space-x-2'>
					<div className='w-full'>
						<input
							className='input w-full border border-white base-text'
							type='text'
							placeholder='search by restaurant or category'
							onChange={inputChange}
							value={searchCriteria.searchString}
						/>
					</div>
					<div className='place-self-end'>
						<button type='button' onClick={toggleModal}>
							<FontAwesomeIcon icon={faSliders} className='icon h-8' />
						</button>
					</div>
				</div>
			</form>
			{toggle &&
				<SearchFilters
					searchCriteria={searchCriteria}
					dispatch={dispatch}
					toggleModal={toggleModal}
				/>
			}
		</div>
	)
}

export default Search
