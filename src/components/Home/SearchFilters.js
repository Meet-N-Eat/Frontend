import { Modal, Dropdown } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import { categoriesArray } from '../../data-and-functions/categoriesArray'
import { citiesArray } from '../../data-and-functions/citiesArray'
import { priceRangeArray } from '../../data-and-functions/priceRangeArray'

const SearchFilters = ({ searchCriteria, dispatch, filterClick, showFilters }) => {
    const { city, category, price } = searchCriteria

    // Handles click events for dropdown menus
    function dropdownChoice(e) {
        e.target.text !== 'None' ?
        dispatch({
            key: e.target.classList[0],
            value: e.target.text
        })
        : dispatch({
            key: e.target.classList[0],
            value: ''
        })
    }

    // Handles click events for checkbox items
    function checkboxClick(e) {
        searchCriteria[e.target.classList[0]] ?
        dispatch({
            key: e.target.classList[0],
            value: ''
        })
        : dispatch({
            key: e.target.classList[0],
            value: e.target.value
        })
    }

    return (
        <Modal show={showFilters} onHide={filterClick}>
            <Modal.Header closeButton>
                <Modal.Title>Filter Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Dropdown>
                        <Dropdown.Toggle id='city-select'>
                            {city || 'select city'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {citiesArray.map((city, index) => <DropdownItem className='city' onClick={dropdownChoice} key={index}>{city}</DropdownItem>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id='category-select'>
                            {category || 'select category'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categoriesArray.map((category, index) => <DropdownItem className='category' onClick={dropdownChoice} key={index}>{category}</DropdownItem>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownToggle id='price-range-select'>
                            {price || 'select price range'}
                        </DropdownToggle>
                        <Dropdown.Menu>
                            {priceRangeArray.map((price, index) => <DropdownItem className='price' onClick={dropdownChoice} key={index}>{price}</DropdownItem>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Modal.Title>More Options:</Modal.Title>
                <div>
                    <label>
                        <input type='checkbox' className='wheelchairAccessible' value='yes' onClick={checkboxClick}/>
                        Wheelchair Accessible
                    </label>
                    <label>
                        <input  type='checkbox' className='openLate' value='yes' onClick={checkboxClick}/>
                            Open Late
                    </label>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SearchFilters