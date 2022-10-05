import React, { useContext, useEffect, useReducer } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { buildSearchParams } from '../../data-and-functions/searchParams';
import { Context } from '../../App';
import RestaurantCard from '../RestaurantCard'


const SearchResults = () => {
    const { searchString } = useParams()
    const [ searchParams ] = useSearchParams()
    const { loggedInUser, dispatchUser } = useContext(Context)
    const [restaurantsData, dispatch] = useReducer(axiosReducer, { searchString: '' })

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

    return (
        <Container>
            {restaurantsData.response && restaurantsData.response.length !== 0 &&
                <Container>
                    <Row xs='3'>{restaurantsData.response.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant._id}/>)}</Row>
                </Container>
            }
            {!restaurantsData.response && <Container><h1>Loading restaurants...</h1></Container>}
            {restaurantsData.response && restaurantsData.response.length === 0 && <Container><h1>No restaurants matching restaurants were found.</h1></Container>}
        </Container>
    )
}

export default SearchResults
