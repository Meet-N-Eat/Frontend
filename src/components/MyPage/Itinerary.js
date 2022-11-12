import {useEffect, useReducer} from 'react'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import Event from './Event'

const Itinerary = ({loggedInUser}) => {
	// State Hooks and Variables
	// ===========================================================================================
	const [events, dispatchEvents] = useReducer(axiosReducer, {})
	let today = new Date().toLocaleDateString()

	// Functions and Event Handlers
	// ===========================================================================================
	useEffect(() => {
		updateEvents()
	}, [])

	function updateEvents() {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/events`,
			loggedInUser.token,
			dispatchEvents
		)
	}

	// Return
	// ===========================================================================
	return (
		<div className='vertical items-center w-full min-h-[830px]'>
			<div className='text-center space-y-1'>
				<h2 className='white-header'>itinerary</h2>
				<h2 className='text-white'> {today} </h2>
			</div>
			<div className='max-h-[720px] max-w-[335px] sm:max-w-[700px] gap-2 grid-centered mx-auto grid-cols-1 lg:grid-cols-2 p-3 overflow-y-auto scroll'>
				{events.response && events.response.length > 0 ? (
					events.response.map(event => (
						<Event event={event} updateEvents={updateEvents} key={event._id} />
					))
				) : (
					<div>no events right now, send someone an invite!</div>
				)}
			</div>
		</div>
	)
}

export default Itinerary
