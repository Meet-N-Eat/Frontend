import moment from 'moment'
import React, {useState, useEffect, useContext} from 'react'
import {OverlayTrigger, Popover, Modal, NavDropdown} from 'react-bootstrap'
import {BiDotsVertical} from 'react-icons/bi'
import {Context} from '../../App'
import {axiosAll} from '../../data-and-functions/axiosAll'
import CoordinateMeetup from './CoordinateMeetup'
import RestaurantCard from '../RestaurantCard'
import ProfileCard from '../ProfileCard'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'

const Event = ({event, updateEvents}) => {
	const {loggedInUser, dispatchUser} = useContext(Context)
	const [modalState, setModalState] = useState(false)
	const [show, setShow] = useState(false)
	const [showEdit, setShowEdit] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	useEffect(() => console.log('Event Rendered'))
	useEffect(() => console.log(event))

	// DATE AND HOUR FORMAT
	let eventDate = moment(event.date)
	const formattedDate = moment.utc(event.date).format('YYYY-MM-DD')
	const formattedHour = eventDate.format('hh:mm')
	const formattedHourAMPM = eventDate.format('hh:mm A')

	function toggleModal() {
		setModalState(!modalState)
	}

	const handleCancel = async () => {
		await axiosAll('DELETE', `/users/events/${event._id}`, loggedInUser.token, null)
		updateEvents()
		handleClose()
	}
	console.log(event.participants)
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
		return (
			<div className='bg-red-900/80 centered p-2 w-[320px] min-h-[450px] max-h-[410px] rounded-2xl mt-2'>
				<div className='w-full'>
					<div className='flex flex-row justify-around items-center w-full'>
						<>
							<p className='text-white'>
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
									<button>edit</button>
								</NavDropdown.Item>
								<NavDropdown.Item>
									<button onClick={handleShow}>Cancel Event</button>
									<Modal show={show} onHide={handleClose}>
										<div closeButton>
											<h1>confirm cancelation</h1>
										</div>
										<div>
											are you sure you don't want to meet a creep and get free food?
										</div>
										<div>
											<button onClick={handleClose}> close </button>
											<button onClick={handleCancel}> cancel event </button>
										</div>
									</Modal>
								</NavDropdown.Item>
							</NavDropdown>
						</>
					</div>
				</div>
				<div className='centered'>
					<RestaurantCard restaurant={event.restaurant} hideLikeButton={true} />
					{['bottom'].map(placement => (
						<OverlayTrigger
							trigger='click'
							key={placement}
							placement={placement}
							overlay={
								<Popover id={`popover-positioned-${placement}`}>
									<h3>{`friends going`}</h3>
									<div>
										<div>
											{event.participants.map(participant => (
												<ProfileCard key={participant} user={participant} />
											))}
										</div>
									</div>
								</Popover>
							}
						>
							<button className='account-button' onClick={toggleModal}>who's going?</button>
						</OverlayTrigger>
					))}
				</div>
			</div>
		)
	}
}

export default Event
