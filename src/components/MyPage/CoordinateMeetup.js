import React, {useEffect, useReducer} from 'react'
import {Dropdown, Modal} from 'react-bootstrap'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {hideModal} from '../../data-and-functions/hideModal'
import ProfileCard from '../ProfileCard'
import RestaurantCard from '../RestaurantCard'

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
	// State Variables
	// ===========================================================================================
	const initialState = {
		restaurant: null,
		participants: [loggedInUser.response._id],
		date: null,
		createdBy: loggedInUser.response._id,
	}

	const [meetup, dispatchMeetup] = useReducer(axiosReducer, event || initialState)
	const [favorites, dispatchFavorites] = useReducer(axiosReducer, [])
	const [showModal, dispatchModal] = useReducer(axiosReducer, {invite: false, invited: false})
	const [date, dispatchDate] = useReducer(axiosReducer, {
		date: '' || formattedDate,
		time: '' || formattedHour,
	})
	const [error, dispatchError] = useReducer(axiosReducer, {date: false, restaurant: false})

	// useEffect(() => console.log('CoordinateMeetup Rendered'))

	useEffect(() => {
		axiosAll(
			'GET',
			`/users/${loggedInUser.response._id}/favorites`,
			loggedInUser.token,
			dispatchFavorites
		)
		hideModal(null, modalHandler)
	}, [])
	console.log(showModal)
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

	function modalHandler(e) {
		// Close any open modals or open the appropriate modal
		if (showModal.invite === true || showModal.invited === true) {
			for (const key in showModal) {
				dispatchModal({
					key: key,
					value: false,
				})
			}
		} else {
			dispatchModal({
				key: e.target.classList[0],
				value: !showModal[e.target.classList[0]],
			})
		}
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
	console.log(meetup)
	return (
		<div className='invite-container'>
			<h1 className='text-2xl'>meet 'n eat with friends</h1>
			{error.restaurant && <h2>select a restaurant for this event</h2>}
			<select
				defaultValue={
					(meetup.restaurant &&
						favorites.response &&
						favorites.response.find(favorite => favorite._id === meetup.restaurant)
							.name) 
					|| 'choose restaurant'
				}
				onChange={restaurantSelect}
			>
				<option value='choose restaurant' disabled hidden>
					choose restaurant
				</option>
				{favorites.response &&
					favorites.response.map(restaurant => (
						<option key={restaurant._id} value={restaurant._id}>
							{restaurant.name}
						</option>
					))}
			</select>
			{error.date && <h2>pick a date and time for this event</h2>}
			<input onChange={e => dateSelect(e, 'date')} type='date' value={date.date} />
			<input onChange={e => dateSelect(e, 'time')} type='time' value={date.time} />
			<div className='space-x-8'>
				<button className='invite button' onClick={modalHandler}>
					invite friends
				</button>
				<button className='invited button' onClick={modalHandler}>
					who's invited?
				</button>
			</div>
			<button className='button' onClick={showEdit ? editEventHandler : createEventHandler}>
				{showEdit ? 'edit' : 'invite'}
			</button>

			{showModal.invite && (
				<div className='modals'>
					<div className='modals-content flex space-x-3'>
						{loggedInUser.response.friends.map((friend) => (
							<div key={friend} className='text-center'>
								<div 
									classname={meetup.participants.find(
										participant => participant === friend
									) && 'friend-invited'}
									onClick={() => inviteHandler(friend)}
								>
									<ProfileCard user={friend} />
								</div>
								{/* <label>
									<input
										key={index}
										type='checkbox'
										id='invite-toggle'
										label='invite'
										defaultChecked={meetup.participants.find(
											participant => participant === friend
										)}
										onClick={() => inviteHandler(friend)}
									/>
									invite
								</label> */}
							</div>
						))}
					</div>
				</div>
			)}

			{showModal.invited && (
				<div className='modals'>
					<div className='modals-content flex space-x-3'>{participantsList()}</div>
				</div>
			)}
		</div>
	)
}

export default CoordinateMeetup
