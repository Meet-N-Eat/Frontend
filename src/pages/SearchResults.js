import React, { useContext, useEffect, useReducer } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard'
import { Container, Row } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll';
import { buildSearchParams } from '../data-and-functions/searchParams';
import { Context } from '../App';


const SearchResults = () => {
    const { searchString } = useParams()
    const [ searchParams ] = useSearchParams()
    const { loggedInUser, dispatchUser } = useContext(Context)
    const [restaurantsData, dispatch] = useReducer(axiosReducer, { response: '', searchString: '' })

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
        axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
    },[])
    console.log(loggedInUser)
    if (typeof restaurantsData.response === 'string') {
        return <h1>Loading restaurants...</h1>
    } else {
        return (
            <Container>
                <Container>
                    {/* <Search /> */}
                </Container>
                <Container style={{ display:'flex', flexDirection:'row', flexWrap:'wrap', width:'90%', alignItems:'center', justifyContent:'center'}}>
                    <Row xs='3'>{restaurantsData.response.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant._id}/>)}</Row>
                </Container>
            </Container>
        )
    }
}

export default SearchResults