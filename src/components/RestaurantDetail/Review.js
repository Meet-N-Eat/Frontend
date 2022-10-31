import React, { useContext, useEffect, useReducer } from 'react'
import { Container, ListGroup, Spinner } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import { formatDateTime } from '../../data-and-functions/formatDateTime'

const Review = ({ review }) => {
    const [reviewer, dispatch] = useReducer(axiosReducer, { response: null })
    const { loggedInUser } = useContext(Context)
    const [date, time] = formatDateTime(review.createdAt)

    useEffect(() => {
        axiosAll('GET', `/users/${review.reviewer}/profileCard`, loggedInUser.token, dispatch)
    },[])

    return (
        <div>
            {reviewer.response ? 
            <ListGroup>
                <ListGroup.Item>{reviewer.response.displayname || reviewer.response.username}</ListGroup.Item>
                <ListGroup.Item>{review.body}</ListGroup.Item>
                <ListGroup.Item>{`${date} ${time}`}</ListGroup.Item>
            </ListGroup>
            : <Spinner animation="border" />
            }
        </div>
    )
}

export default Review