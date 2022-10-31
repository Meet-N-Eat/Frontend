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
        <div>
                <div>
                    <h2>itinerary</h2>
                    <h2> {today} </h2>
                </div>
                <div>
                    {events.response && events.response.length > 0 ?
                        events.response.map(event => <Event event={event} updateEvents={updateEvents} key={event._id}/>)
                        : <div>no events right now, send someone an invite!</div>
                    }
                </div>
        </div>
    )
}

export default Itinerary