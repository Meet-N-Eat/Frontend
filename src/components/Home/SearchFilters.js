import {categoriesArray} from '../../data-and-functions/categoriesArray'
import {citiesArray} from '../../data-and-functions/citiesArray'
import {priceRangeArray} from '../../data-and-functions/priceRangeArray'

const SearchFilters = ({searchCriteria, dispatch}) => {
	const {city, category, price} = searchCriteria

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
	console.log('rendered')
	return (
		<div className='modala' id='filter-modal'>
			<form className='modala-content p-3 flex flex-col items-center space-y-3'>
				<p className='text-red-600 text-2xl'>Filter Options</p>
				<div className='flex space-x-1'>
					<select
						defaultValue={city || 'select a city'}
						className='city border rounded text-center'
						onChange={dropdownChoice}
					>
						<option value='select a city' disabled hidden>
							select a city
						</option>
						{citiesArray.map(city => (
							<option value={city} key={city}>
								{city}
							</option>
						))}
					</select>
					<select
						defaultValue={category || 'select a category'}
						className='category border rounded text-center'
						onChange={dropdownChoice}
					>
						<option value='select a category' disabled hidden>
							select a category
						</option>
						{categoriesArray.map(category => (
							<option value={category} key={category}>
								{category}
							</option>
						))}
					</select>
					<select
						defaultValue={price || 'select price range'}
						className='price border rounded text-center'
						onChange={dropdownChoice}
					>
						<option value='select price range' disabled hidden>
							select price range
						</option>
						{priceRangeArray.map(price => (
							<option value={price} key={price}>
								{price}
							</option>
						))}
					</select>
				</div>
				<div className='flex space-x-2'>
					<label>
						<input
							type='checkbox'
							className='wheelchairAccessible mr-1'
							value='yes'
							onClick={checkboxClick}
						/>
						Wheelchair Accessible
					</label>
					<label>
						<input
							type='checkbox'
							className='openLate mr-1'
							value='yes'
							onClick={checkboxClick}
						/>
						Open Late
					</label>
				</div>
			</form>
		</div>
	)
}

export default SearchFilters
