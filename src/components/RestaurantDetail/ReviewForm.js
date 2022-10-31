import { useState } from 'react'
import { useContext, useEffect, useReducer } from 'react'
import { Button, Container, Dropdown, Form } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'

const ReviewForm = ({ restaurantId, handleShow }) => {
    const { loggedInUser } = useContext(Context)

    const initialState = {
        reviewer: loggedInUser.response._id,
        stars: '',
        body: ''
    }

    const [review, dispatchReview] = useReducer(axiosReducer, initialState)
    const [validate, dispatchValidate] = useReducer(axiosReducer, { valid: false })
    const starMenu = ['None', '1', '2', '3', '4', '5']

    function starClick(e) {
        e.target.text !== 'None' ?
        dispatchReview({
            key: 'stars',
            value: e.target.text})
        : dispatchReview({
            key: 'stars',
            value: ''})
    }

    function reviewChange(e) {
        dispatchReview({
            key: 'body',
            value: e.target.value})
    }

    async function reviewSubmit(e) {
        e.preventDefault()

        review.stars == '' ? 
            dispatchValidate({ key: 'missingStars', value: true}) 
            : dispatchValidate({ key: 'missingStars', value: false})
        review.body == '' ? 
            dispatchValidate({ key: 'missingBody', value: true})
            : dispatchValidate({ key: 'missingBody', value: false})

        review.stars != '' && review.body != '' &&
            (await axiosAll('POST', `/restaurants/${restaurantId}/reviews`, loggedInUser.token, null, review) &&
            handleShow())
    }

return (
    <Container>
        <Form>
            <Form.Group controlId='reviewBody'>
                <Dropdown>
                    <Form.Label>
                        {validate.missingStars ? 
                            'Please add a star rating to this review' 
                            : 'Give it some stars'
                        }
                    </Form.Label>
                    <Dropdown.Toggle>
                        {review.stars || 'Stars'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {starMenu.map((menuItem, index) => <Dropdown.Item className='stars' onClick={starClick} key={index}>{menuItem}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Label>
                    {validate.missingBody ?
                        'Please enter something about your experience'
                        : 'Tell us your thoughts'
                    }
                </Form.Label>
                <Form.Control 
                    as='textarea' 
                    rows={3} 
                    onChange={reviewChange}
                    value={review.body}
                />
                <Button onClick={reviewSubmit}>Submit</Button>
            </Form.Group>
        </Form>
    </Container>
)
}

export default ReviewForm