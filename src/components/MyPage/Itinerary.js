import {useEffect} from 'react'
import {axiosAll} from '../../data-and-functions/axiosAll'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import { Spinner } from 'react-bootstrap'
import Event from './Event'

const Itinerary = ({loggedInUser}) => {
	// State Hooks and Variables
	// ===========================================================================
	const [events, dispatchEvents] = useGlobalReducer({})
	let today = new Date().toLocaleDateString()

	// Event Handlers and Functions
	// ===========================================================================
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
					events.response.sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => (
						<Event event={event} updateEvents={updateEvents} key={event._id} />
					))
				)}
			</div>
		</div>
	)
}

export default Itinerary
