import moment from 'moment'
import React, {useState} from 'react'
import {Modal, NavDropdown} from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'
import {axiosAll} from '../../data-and-functions/axiosAll'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import CoordinateMeetup from './CoordinateMeetup'
import RestaurantCard from '../RestaurantCard'
import ProfileCard from '../ProfileCard'

const Event = ({event, updateEvents}) => {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser, dispatchUser} = useAuth()
	const [show, setShow] = useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const [modalShow, setModalShow] = useState(false)
	const [ownEvent, setOwnEvent] = useState(event.createdBy === loggedInUser?.response.id)

	// DATE AND HOUR FORMAT
	let eventDate = moment(event.date)
	const formattedDate = moment.utc(event.date).format('YYYY-MM-DD')
	const formattedHour = eventDate.format('hh:mm')
	const formattedHourAMPM = eventDate.format('hh:mm A')

	// Event Handlers and Functions
	// ===========================================================================
	const handleCancel = async () => {
		await axiosAll('DELETE', `/users/events/${event._id}`, loggedInUser.token, null)
		updateEvents()
		setShow(false)
	}

	if (showEdit) {
		return (
			<CoordinateMeetup
				loggedInUser={loggedInUser}
				dispatchUser={dispatchUser}
				event={event}
				formattedDate={formattedDate}
				formattedHour={formattedHour}
				showEdit={showEdit}
				setShowEdit={setShowEdit}
				updateEvents={updateEvents}
			/>
		)
	} else {
		// Return
		// ===========================================================================
		return (
			<div className='main-bg grid-centered p-2 w-[330px] h-[460px] mt-2'>
				<div className='w-full'>
					<div className='horizontal justify-around items-center w-full'>
						<>
							<p className='text-white base-text'>
								{formattedDate} at {formattedHourAMPM}
							</p>
							{ownEvent && (
								<NavDropdown
									className='nav-dropdown d-inline-block'
									title={
										<FontAwesomeIcon
											icon={faEllipsisVertical}
											className='icon text-white w-1/2 float-right'
										/>
									}
								>
									<NavDropdown.Item>
										<button
											className='base-text w-full'
											onClick={() => setShowEdit(true)}
										>
											Edit
										</button>
									</NavDropdown.Item>
									<NavDropdown.Item>
										<button
											className='base-text w-full'
											onClick={() => setShow(true)}
										>
											Cancel Event
										</button>
										<Modal size='xl' show={show} onHide={() => setShow(false)}>
											<div className='modals-content h-[200px] flex flex-col justify-around p-3'>
												<div closeButton className='text-center'>
													<h1 className='base-text'>Confirm cancelation</h1>
												</div>
												<div className='text-xs md:text-sm text-center'>
													Are you sure you want to cancel this event?
												</div>
												<div className='flex flex-row justify-between'>
													<button
														className='base-text button mr-1'
														onClick={() => setShow(false)}
													>
														Close{' '}
													</button>
													<button
														className='base-text account-button ml-1'
														onClick={handleCancel}
													>
														Cancel event{' '}
													</button>
												</div>
											</div>
										</Modal>
									</NavDropdown.Item>
								</NavDropdown>
							)}
						</>
					</div>
				</div>
				<div className='grid-centered'>
					<RestaurantCard restaurant={event.restaurant} hideLikeButton={true} />
					<Modal
						className='w-full'
						show={modalShow}
						onHide={() => setModalShow(false)}
						aria-labelledby='whosgoing-modal'
					>
						<div className='modals-content max-h-[500px] overflow-auto scroll'>
							<Modal.Header>
								<Modal.Title className='text-white mx-auto'>who's going?</Modal.Title>
							</Modal.Header>
							<Modal.Body className=''>
								<div className='grid-centered overflow-auto'>
									{event.participants.map(participant => (
										<ProfileCard
											modalShow={modalShow}
											key={participant}
											user={participant}
										/>
									))}
								</div>
							</Modal.Body>
						</div>
					</Modal>
					<div className='py-2'>
						<button className='button base-text' onClick={() => setModalShow(true)}>
							Who's going?
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Event
