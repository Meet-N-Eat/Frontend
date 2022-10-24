import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { buildSearchParams } from '../../data-and-functions/searchParams';
import { Context } from '../../App';
import RestaurantCard from '../RestaurantCard'
import Pagination from './Pagination';


const SearchResults = () => {
    // State Variables
    // ===========================================================================================
    const { searchString } = useParams()
    const [ searchParams ] = useSearchParams()
    const { loggedInUser, dispatchUser } = useContext(Context)
    const [restaurantsData, dispatch] = useReducer(axiosReducer, { searchString: '' })
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6

   

    useEffect(() => {
        let params = [], values = []
        for(const entry of searchParams.entries()) {
            // Pull out the paramater and value on each pass
            const [param, value] = entry
            // Push param and value into arrays on each pass
            params.push(param)
            values.push(value)
        }
        // Get restaurants that match search criteria
        axiosAll('GET', `/restaurants/results/${searchString}${buildSearchParams(params, values)}`, loggedInUser.token, dispatch)

        // Update user state
        loggedInUser.token && axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
    },[])

    
    
    // Functions and Event Handlers
    // ===========================================================================================
    // Pagination
    // Getting cards on the current page
    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    // Change page number
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return (
        <Container>
            {restaurantsData.response && restaurantsData.response.length !== 0 &&
                <div>
                    <Container>
                        <Row xs='3'>{restaurantsData.response.slice(indexOfFirstCard, indexOfLastCard).map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant._id}/>)}</Row>
                    </Container>
                    <Pagination cardsPerPage={cardsPerPage} totalCards={restaurantsData.response.length} paginate={paginate}/>
                </div>
            }
            {!restaurantsData.response && <Container><h1>Loading restaurants...</h1></Container>}
            {restaurantsData.response && restaurantsData.response.length === 0 && <Container><h1>No restaurants matching restaurants were found</h1></Container>}
        </Container>
    )
}

export default SearchResults
