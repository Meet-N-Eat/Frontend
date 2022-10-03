import { Modal, Dropdown, Row } from 'react-bootstrap'
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
            <Modal.Header style={{border:'1px solid #D6300F', backgroundColor:'#D6300F', color:'white'}} closeButton>
                <Modal.Title style={{margin:'0 auto', width:'100%', display:"flex", flexDirection:'row', justifyContent:'center'}}>Filter Options</Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{border:'1px solid #D6300F'}} >
                <Row xs='3'>
                    <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                        <Dropdown  style={{marginRight:'4%'}}>
                            <Dropdown.Toggle style={{backgroundColor:'white', color:'black', borderColor:'#D6300F'}} id='city-select'>
                                {city || 'select city'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {citiesArray.map((city, index) => <DropdownItem className='city' onClick={dropdownChoice} key={index}>{city}</DropdownItem>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown  style={{marginRight:'4%'}}>
                            <Dropdown.Toggle style={{backgroundColor:'white', color:'black', borderColor:'#D6300F'}} id='category-select'>
                                {category || 'select category'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {categoriesArray.map((category, index) => <DropdownItem className='category' onClick={dropdownChoice} key={index}>{category}</DropdownItem>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownToggle style={{backgroundColor:'white', color:'black', borderColor:'#D6300F'}} id='price-range-select'>
                                {price || 'select price range'}
                            </DropdownToggle>
                            <Dropdown.Menu>
                                {priceRangeArray.map((price, index) => <DropdownItem className='price' onClick={dropdownChoice} key={index}>{price}</DropdownItem>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Row>
                <Modal.Title style={{marginTop:'3%', marginBottom:'3%'}}>More Options:</Modal.Title>
                <div style={{width:'100%', display:"flex", flexDirection:'column', marginTop:'2%', width:'50%'}}>
                    <label style={{border:'1px solid #D6300F', padding:'1%', borderRadius:'5px', marginBottom:'5%'}}>
                        <input type='checkbox' className='wheelchairAccessible' value='yes' onClick={checkboxClick}/>
                        Wheelchair Accessible
                    </label>
                    <label style={{border:'1px solid #D6300F', padding:'1%', borderRadius:'5px'}} >
                        <input  type='checkbox' className='openLate' value='yes' onClick={checkboxClick}/>
                            Open Late
                    </label>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SearchFilters