
import { useContext, useEffect, useReducer } from 'react'
import {  Card, Container } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import Review from './Review'


const Reviews = ({ restaurantId, modalShow }) => {
    // State hooks and variable declarations
    // ===========================================================================
    const [ reviews, dispatchReviews ] = useReducer(axiosReducer, {})
    const { loggedInUser } = useContext(Context)

    useEffect(() => {
        axiosAll('GET', `/restaurants/${restaurantId}/reviews`, loggedInUser.token, dispatchReviews)
        console.log('Get reviews')
    }, [modalShow])

    if(!reviews.response) {
        return <Container>Loading...</Container>
    }
    return (
        <div style={{  display:'flex', justifyContent:'center', marginTop:'2%'}}>

            <Card style={{width:'50%', borderColor:'white'}}>
                <Card.Body>
                    {reviews.response.reviews && reviews.response.reviews.map(review => <Review review={review} key={review._id} />)}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Reviews