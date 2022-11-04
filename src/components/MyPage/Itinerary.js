import { useEffect, useReducer } from 'react'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import Event from './Event'

const Itinerary = ({ loggedInUser }) => {
    const [events, dispatchEvents] = useReducer(axiosReducer, {})
    useEffect(() => {
        updateEvents()
    }, [])

    let today = new Date().toLocaleDateString()

    function updateEvents() {
        axiosAll('GET', `/users/${loggedInUser.response._id}/events`, loggedInUser.token, dispatchEvents)
    }

    return (
        <div className='centered main-bg rounded-2xl p-5 w-1/2'>
                <div>
                    <h2 className='text-white'>itinerary</h2>
                    <h2 className='text-white'> {today} </h2>
                </div>
                <div className='w-1/2 centered'>
                    {events.response && events.response.length > 0 ?
                        events.response.map(event => <Event event={event} updateEvents={updateEvents} key={event._id}/>)
                        : <div>no events right now, send someone an invite!</div>
                    }
                </div>
        </div>
    )
}

export default Itinerary