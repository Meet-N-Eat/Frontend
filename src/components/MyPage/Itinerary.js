import {useEffect, useReducer} from 'react'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import Event from './Event'
import { Spinner } from 'react-bootstrap'

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
		<div className='vertical items-center w-[355px] md:w-[700px]'>
			<div className='text-center space-y-1'>
				<h2 className='white-header'>itinerary</h2>
				<h2 className='text-white'> {today} </h2>
			</div>
			{!events.response && (
				<div className='mt-4 p-4'>
					<Spinner animation='border' variant="light" /> 
				</div>
			)}
			{events.response && events.response.length === 0 && (
				<div className='main-bg mt-8 w-[350px] md:w-[450px] p-4'>
					<p className='text-white base-text text-center'>Send an invite to create an event</p>
				</div>
			)}
			<div className='responsive-mypage gap-2 grid-centered mx-auto grid-cols-1 md:grid-cols-2 overflow-auto scroll'>
				{events.response && events.response.length > 0 && (
					events.response.map(event => (
						<Event event={event} updateEvents={updateEvents} key={event._id} />
					))
				)}
			</div>
		</div>
	)
}

export default Itinerary
