import { useContext, useEffect, useReducer } from 'react'
import { Spinner } from 'react-bootstrap'
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
                <ul>
                    <li>{reviewer.response.displayname || reviewer.response.username}</li>
                    <li>{review.body}</li>
                    <li>{`${date} ${time}`}</li>
                </ul>
                : <Spinner animation="border" />
            }
        </div>
    )
}

export default Review