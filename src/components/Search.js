import { useReducer, useState } from "react"
import { Button, ButtonGroup, Col, Container,  Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getSearchParams } from "../data-and-functions/searchParams"
import { searchCriteriaReducer } from "../data-and-functions/searchCriteriaReducer"
import SearchFilters from "./SearchFilters"

const Search = () => {
    // Initial state for searchCriteria
    // ===========================================================================
    const initialState = {
        searchString: '',
        city: '',
        category: '',
        price: '',
        wheelchairAccessible: '',
        openLate: ''
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
            value: e.target.value})
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
        <Container style={{}}>
            <Form style={{marginBottom:'2%'}} onSubmit={formSubmit}>
                <Form.Group style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}} controlId='searchInput'>
                    <Row className='d-flex justify-content-end'>
                        <Col className='gx-5'>
                            <Form.Control
                                style={{ width:'200%', border:'1px solid #D6300F', backgroundColor:'white'}}
                                type='text'
                                placeholder='search by restaurant or category'
                                onChange={inputChange}
                                value={searchCriteria.searchString}
                            />
                        </Col>
                        <Col>
                            <ButtonGroup>
                                <Button
                                    style={{backgroundColor:'#D6300F', border:'1px solid #D6300F'}}
                                    type='submit'
                                >search</Button>
                                <Button
                                    style={{backgroundColor:'#D6300F', border:'1px solid #D6300F', borderLeft:'2px solid white'}}
                                    type='button'
                                    onClick={filterClick}
                                >filters</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            <SearchFilters
                searchCriteria={searchCriteria}
                dispatch={dispatch} 
                filterClick={filterClick}
                showFilters={showFilters}
            />
        </Container>
    )
}

export default Search