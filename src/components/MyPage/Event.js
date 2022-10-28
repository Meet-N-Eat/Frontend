import moment from 'moment'
import React, { useState, useEffect, useContext } from 'react'
import { Card, OverlayTrigger, Popover, Button, ListGroup, Modal, NavDropdown } from 'react-bootstrap'
import { BiDotsVertical } from 'react-icons/bi'
import { Context } from '../../App'
import { axiosAll } from '../../data-and-functions/axiosAll'
import CoordinateMeetup from './CoordinateMeetup'
import RestaurantCard from '../RestaurantCard'

const Event = ({ event, updateEvents }) => {
    const { loggedInUser, dispatchUser } = useContext(Context)
    // const [restaurant, dispatchRestaurant] = useReducer(axiosReducer, null)
    const [modalState, setModalState] = useState(false)
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false) 
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => console.log('Event Rendered'))
    useEffect(() => console.log(event))
    
    // DATE AND HOUR FORMAT
    let eventDate = moment(event.date)
    const formattedDate = moment.utc(event.date).format('YYYY-MM-DD')
    const formattedHour = (eventDate).format('hh:mm')
    const formattedHourAMPM = (eventDate).format('hh:mm A')

    function toggleModal() {
        setModalState(!modalState)
    }

    const handleCancel = async () => {
        await axiosAll('DELETE', `/users/events/${event._id}`, loggedInUser.token, null)
        updateEvents()
        handleClose()
    }
    console.log(event.participants)
    if(showEdit) {
        return (
            <CoordinateMeetup 
                loggedInUser={loggedInUser} 
                dispatchUser={dispatchUser} 
                showEdit={showEdit} event={event} 
                formattedDate={formattedDate} 
                formattedHour={formattedHour} 
                setShowEdit={setShowEdit} 
            />
        )
    }
    else {
        return (
            <Card style={{ width:'80%', marginBottom:'2%', border:"1px solid #D6300F" }}>
                <Card.Header style={{backgroundColor:'#D6300F', color:'white'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <p>{formattedDate} at {formattedHourAMPM}</p>
                        <NavDropdown className="nav-dropdown d-inline-block" title={<BiDotsVertical style={{color:'white'}} size={20} onClick={() => {console.log(event)}}/>}>
                            <NavDropdown.Item>
                                <Button variant='danger' style={{color:'black'}} onClick={() => {setShowEdit(true)}}>Edit</Button>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Button variant="danger" onClick={handleShow} style={{color:'black'}}>Cancel Event</Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Confirm cancelation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you don't want to meet a creep and get free food?</Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} style={{color:'black'}}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={handleCancel} style={{backgroundColor:'#D6300F'}}>
                                            Cancel Event
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Card.Header>
                <Card.Body style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                    <RestaurantCard restaurant={event.restaurant} hideLikeButton={true} />
                    {['bottom'].map((placement) => (
                        <OverlayTrigger
                        trigger="click"
                        key={placement}
                        placement={placement}
                        overlay={
                            <Popover id={`popover-positioned-${placement}`}>
                            <Popover.Header style={{backgroundColor:'#F0704E', color:'white'}} as="h3">{`friends going`}</Popover.Header>
                            <Popover.Body>
                                <ListGroup>
                                    {event.participants.map(participant => <ListGroup.Item key={participant._id}><strong>{participant.displayname || participant.username}</strong></ListGroup.Item>)}
                                </ListGroup>
                            </Popover.Body>
                            </Popover>
                        }
                        >
                        <Button 
                            style={{backgroundColor:'white', border:'1px solid #D6300F', color:'black'}}
                            onClick={toggleModal}
                        >who's going?</Button>
                        </OverlayTrigger>
                    ))}     
                </Card.Body>
            </Card>
        )
    }
}

export default Event