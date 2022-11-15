import React, {useEffect, useReducer} from 'react'
import {useState} from 'react'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import ProfileCard from '../ProfileCard'

const CoordinateMeetup = ({
	loggedInUser,
	dispatchUser,
	showEdit,
	event,
	formattedHour,
	formattedDate,
	setShowEdit,
	updateEvents,
}) => {
	// State Hooks and Variables
	// ===========================================================================================
	const initialState = {
		restaurant: null,
		participants: [loggedInUser.response._id],
		date: null,
		createdBy: loggedInUser.response._id,
	}

	const [meetup, dispatchMeetup] = useReducer(axiosReducer, event || initialState)
	const [favorites, dispatchFavorites] = useReducer(axiosReducer, [])
	const [toggle, setToggle] = useState(false)
	const [date, dispatchDate] = useReducer(axiosReducer, {
		date: '' || formattedDate,
		time: '' || formattedHour,
	})
	const [error, dispatchError] = useReducer(axiosReducer, {date: false, restaurant: false})

	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/favorites`,
			loggedInUser.token,
			dispatchFavorites
		)
	}, [])

	// Functions and Event Handlers
	// ===========================================================================================

	// Creates a date object from date and time inputs
	function combineDate(date, time) {
		const dateArr = date.split('-')
		const timeArr = time.split(':')
		const newDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1])

		return newDate
	}

	// Populates "who's invited?" modal
	function participantsList() {
		let participants = loggedInUser.response.friends
			.filter(friend => meetup.participants.find(participant => participant === friend))
			.map(friend => <ProfileCard key={friend} user={friend} />)

		if (participants.length === 0)
			participants = <h1>You're rollin' solo, invite some of your peeps!</h1>

		return participants
	}

	function toggleModal(e) {
		if (toggle) {
			if (e.target.className.includes('modals') && !e.target.className.includes('content'))
				setToggle(prevState => !prevState)
		} else setToggle(prevState => !prevState)
	}

	function inviteHandler(friend) {
		// Determine if the friend is already invited to the event
		const invited = meetup.participants.find(participant => participant === friend)

		// If friend is already invited, remove them from participants, otherwise add them to participants
		dispatchMeetup({
			key: 'participants',
			value: invited
				? meetup.participants.filter(participant => participant !== friend)
				: [...meetup.participants, friend],
		})
	}

	function restaurantSelect(e) {
		dispatchMeetup({
			key: 'restaurant',
			value: e.target.value,
		})
	}

	function dateSelect(e, key) {
		dispatchDate({
			key: key,
			value: e.target.value,
		})
	}

	useEffect(() => {
		date.date &&
			date.time &&
			dispatchMeetup({
				key: 'date',
				value: combineDate(date.date, date.time),
			})
	}, [date])

	function createEventHandler() {
		for (const key in meetup) {
			dispatchError({
				key: key,
				value: meetup[key] === null ? true : false,
			})
		}
		dispatchError({
			key: 'submit',
			value: true,
		})
	}

	async function editEventHandler() {
		await axiosAll('PUT', `/users/events/edit`, loggedInUser.token, null, meetup)
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/events`,
			loggedInUser.token,
			updateEvents
		)
		setShowEdit(false)
	}

	useEffect(() => {
		if (error.submit) {
			if (!error.date && !error.restaurant) {
				if (showEdit) axiosAll('PUT', `/users/events/edit`, loggedInUser.token, null, meetup)
				else axiosAll('POST', `/users/events/create`, loggedInUser.token, null, meetup)

				axiosAll('GET', `/users/${loggedInUser.response._id}`, loggedInUser.token, dispatchUser)

				dispatchMeetup({
					key: 'initialize',
					value: initialState,
				})

				dispatchDate({
					key: 'initialize',
					value: {date: '', time: ''},
				})
			}
		} else {
			error.submit = false
		}
	}, [error])
	
	// Return
	// ===========================================================================
	return (
		<div className='main-bg invite-container'>
			<h1 className='white-header'>meet 'n eat with friends</h1>
			{error.restaurant && <h2>select a restaurant for this event</h2>}
			<select
				className='w-[320px]'
				defaultValue={
					(meetup.restaurant &&
						favorites.response &&
						favorites.response.find(favorite => favorite._id === meetup.restaurant).name) ||
					'choose restaurant'
				}
				onChange={restaurantSelect}
			>
				<option value='choose restaurant base-text' disabled hidden>
					choose restaurant
				</option>
				{favorites.response &&
					favorites.response.map(restaurant => (
						<option key={restaurant._id} value={restaurant._id}>
							<p className='base-text'>{restaurant.name}</p>
						</option>
					))}
			</select>
			{error.date && <h2 className='base-text'>pick a date and time for this event</h2>}
			<input className='w-[320px] base-text' onChange={e => dateSelect(e, 'date')} type='date' value={date.date}/>
			<input className='w-[320px] base-text' onChange={e => dateSelect(e, 'time')} type='time' value={date.time} />
			<button className='invite button base-text' onClick={toggleModal}>
				invite friends
			</button>
			<button className='button base-text' onClick={showEdit ? editEventHandler : createEventHandler}>
				{showEdit ? 'edit' : 'invite'}
			</button>

			{toggle && (
				<div className='modals' onClick={toggleModal}>
					<div className='modals-content display-friends'>
						{loggedInUser.response.friends.map(friend => (
							<div key={friend} className='text-center'>
								<div
									className={
										meetup.participants.find(participant => participant === friend) &&
										'friend-invited'
									}
									onClick={() => inviteHandler(friend)}
								>
									<ProfileCard user={friend} />
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default CoordinateMeetup
