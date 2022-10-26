import React, { useContext, useEffect, useReducer } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
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

    if(!reviewer.response) return <Container>Loading...</Container>
    return (
        <ListGroup style={{border:'1px solid #D6300F'}} horizontal>
            <ListGroup.Item style={{borderRightColor:'#D6300F', width:'20%'}}>{reviewer.response.displayname || reviewer.response.username}</ListGroup.Item>
            <ListGroup.Item style={{ borderRightColor:'#D6300F', width:'60%' }}>{review.body}</ListGroup.Item>
            <ListGroup.Item>{`${date} ${time}`}</ListGroup.Item>
        </ListGroup>
    )
}

export default Review