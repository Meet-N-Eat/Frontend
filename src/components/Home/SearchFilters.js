import {categoriesArray} from '../../data-and-functions/categoriesArray'
import {citiesArray} from '../../data-and-functions/citiesArray'
import {priceRangeArray} from '../../data-and-functions/priceRangeArray'

const SearchFilters = ({searchCriteria, dispatch, toggleModal }) => {
	const {city, category, price, wheelchairAccessible, openLate} = searchCriteria

	// Handles click events for dropdown menus
	function dropdownChoice(e) {
		e.target.value !== 'None'
			? dispatch({
					key: e.target.classList[0],
					value: e.target.value,
			  })
			: dispatch({
					key: e.target.classList[0],
					value: '',
			  })
	}

	// Handles click events for checkbox items
	function checkboxClick(e) {
		searchCriteria[e.target.classList[0]]
			? dispatch({
					key: e.target.classList[0],
					value: '',
			  })
			: dispatch({
					key: e.target.classList[0],
					value: e.target.value,
			  })
	}

	return (
		<div 
			className='modals' 
			id='filter-modal'
			onClick={toggleModal}
		>
			<form className='modals-content standard-width max-w-[800px] p-3 vertical items-center space-y-3'>
				<p className='white-header font-normal'>Filter Options</p>
				<div className='flex vertical space-y-4 md:space-y-0 md:horizontal md:space-x-2'>
					<select
						defaultValue={city || 'select a city'}
						className='city base-text'
						onChange={dropdownChoice}
					>
						<option value='select a city' disabled hidden>
							select a city
						</option>
						{citiesArray.map(city => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
					<select
						defaultValue={category || 'select a category'}
						className='category base-text'
						onChange={dropdownChoice}
					>
						<option value='select a category' disabled hidden>
							select a category
						</option>
						{categoriesArray.map(category => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					<select
						defaultValue={price || 'select price range'}
						className='price base-text'
						onChange={dropdownChoice}
					>
						<option value='select price range' disabled hidden>
							select price range
						</option>
						{priceRangeArray.map(price => (
							<option key={price} value={price}>
								{price}
							</option>
						))}
					</select>
				</div>
				<div className='flex vertical space-y-2 md:space-y-0 md:horizontal md:space-x-2 text-white text-center base-text'>
					<label>
						<input
							type='checkbox'
							className='wheelchairAccessible'
							value='yes'
							checked={wheelchairAccessible}
							onChange={checkboxClick}
						/>
						Wheelchair Accessible
					</label>
					<label>
						<input
							type='checkbox'
							className='openLate'
							value='yes'
							checked={openLate}
							onChange={checkboxClick}
						/>
						Open Late
					</label>
				</div>
			</form>
		</div>
	)
}

export default SearchFilters
