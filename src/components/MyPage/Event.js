import React, { useState, useEffect, useContext } from 'react'
import { Card, OverlayTrigger, Popover, Button, ListGroup, Modal, NavDropdown } from 'react-bootstrap'
import { BiDotsVertical } from 'react-icons/bi'
import { Context } from '../../App'
import { axiosAll } from '../../data-and-functions/axiosAll'

const Event = ({ event }) => {
    const { loggedInUser } = useContext(Context)
    const [modalState, setModalState] = useState(false)
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false) 
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editClose = () => setShowEdit(false)
    const editShow = () => setShowEdit(true)

    useEffect(() => console.log('Event Rendered'))
    
    function toggleModal() {
        setModalState(!modalState)
    }

console.log(event)

    const handleCancel = () => {
        axiosAll('DELETE', `/users/events/${event._id}`, loggedInUser.token)
        handleClose()
    }

return (
<Card style={{ width:'80%', marginBottom:'2%', border:"1px solid #D6300F" }}>
    <Card.Header style={{backgroundColor:'#D6300F', color:'white'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <p>{event.date}</p>
            <NavDropdown className="nav-dropdown d-inline-block" title={<BiDotsVertical style={{color:'white'}} size={20} onClick={() => {console.log(event)}}/>}>
                    <NavDropdown.Item>
                        <Button variant='danger' style={{color:'black'}} onClick={editShow}>Edit</Button>
                        <Modal show={showEdit} onHide={editClose}>
                            {/* <CoordinateMeetup loggedInUser={loggedInUser} event={event} */}
                        </Modal>
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

        <Card.Title>{event.restaurant.name}</Card.Title>
        <Card.Text>{event.restaurant.display_phone}</Card.Text>
        <Card.Text>{event.restaurant.location.address1}</Card.Text>
        <Card.Text>{event.restaurant.location.city}</Card.Text>
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
                        {event.participants.map(participant => <ListGroup.Item key={participant._id}><strong>{participant.displayname}</strong></ListGroup.Item>)}
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

export default Event