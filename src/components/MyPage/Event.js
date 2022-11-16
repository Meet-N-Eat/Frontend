import moment from 'moment'
import React, {useState, useEffect, useContext} from 'react'
import { Modal, NavDropdown} from 'react-bootstrap'
import {Context} from '../../App'
import {axiosAll} from '../../data-and-functions/axiosAll'
import CoordinateMeetup from './CoordinateMeetup'
import RestaurantCard from '../RestaurantCard'
import ProfileCard from '../ProfileCard'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'

const Event = ({event, updateEvents}) => {
	// State Hooks and Variables
	// ===========================================================================================
	const {loggedInUser, dispatchUser} = useContext(Context)
	const [show, setShow] = useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const [modalShow, setModalShow] = useState(false)


	//cancel
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const showHandler = () => {
		setModalShow(!modalShow)
	}

	const closeEdit = () => setShowEdit(false)
	const openEdit = () => setShowEdit(true)
	const editHandler = () => {
		setShowEdit(prevState => !prevState)
	}

	// DATE AND HOUR FORMAT
	let eventDate = moment(event.date)
	const formattedDate = moment.utc(event.date).format('YYYY-MM-DD')
	const formattedHour = eventDate.format('hh:mm')
	const formattedHourAMPM = eventDate.format('hh:mm A')

	// Functions and Event Handlers
	// ===========================================================================================
	const handleCancel = async () => {
		await axiosAll('DELETE', `/users/events/${event._id}`, loggedInUser.token, null)
		updateEvents()
		handleClose()
	}
	
	if (showEdit) {
		return (
			<CoordinateMeetup
				loggedInUser={loggedInUser}
				dispatchUser={dispatchUser}
				showEdit={showEdit}
				event={event}
				formattedDate={formattedDate}
				formattedHour={formattedHour}
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
								<button className='base-text' onClick={openEdit}>Edit</button>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<button className='base-text' onClick={handleShow}>Cancel Event</button>
								<Modal size='xl' show={show} onHide={handleClose}>
									<div className='modals-content h-[200px] flex flex-col justify-around p-3'>
										<div closeButton>
											<h1 className='base-text'>Confirm cancelation</h1>
										</div>
										<div className='text-xs md:text-sm'>
											Are you sure you want to cancel this event?
										</div>
										<div className='flex flex-row justify-between'>
											<button className='base-text button mr-1' onClick={handleClose}>Close </button>
											<button className='base-text account-button ml-1' onClick={handleCancel}>Cancel event </button>
										</div>
									</div>
								</Modal>
							</NavDropdown.Item>
						</NavDropdown>
					</>
				</div>
			</div>
			<div className='grid-centered'>
				<RestaurantCard restaurant={event.restaurant} hideLikeButton={true} />
				<Modal
				show={modalShow}
				onHide={showHandler}
				aria-labelledby="whosgoing-modal"
				>
					<div className='modals-content'>
						<Modal.Header>
							<Modal.Title className='text-white mx-auto'>who's going?</Modal.Title>
						</Modal.Header>
						<Modal.Body className=''>
							<div className='grid-centered overflow-auto'>
								{event.participants.map(participant => (
									<ProfileCard modalShow={modalShow} key={participant} user={participant} />
									))}
							</div>
						</Modal.Body>
					</div>
				</Modal>
				<div className='py-2'>
					<button className='button base-text' onClick={showHandler}>Who's going?</button>
				</div>
			</div>
		</div>
	)
	}
}

export default Event
