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
                <ul className='flex flex-row justify-between items-center bg-red-900/90 rounded-2xl m-1'>
                    <li className='min-h-[70px] max-w-[90px] p-1 text-white rounded-tl-2xl rounded-bl-2xl'>{reviewer.response.displayname || reviewer.response.username}</li>
                    <li className='w-full min-h-[70px] grid-centered text-white'>{review.body}</li>
                    <li className='min-h-[70px] float-right max-w-[100px] grid-centered text-white rounded-br-2xl rounded-tr-2xl'>{`${date} ${time}`}</li>
                </ul>
                : <Spinner animation="border" />
            }
        </div>
    )
}

export default Review