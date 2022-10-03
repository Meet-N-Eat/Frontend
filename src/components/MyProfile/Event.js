import React, { useState } from 'react'
import { Card, OverlayTrigger, Popover, Button, ListGroup } from 'react-bootstrap'

const Event = ({ event }) => {
    const [modalState, setModalState] = useState(false)

    function toggleModal() {
        setModalState(!modalState)
    }

    console.log(event.restaurant)

return (
<Card style={{ width:'80%', marginBottom:'2%', border:"1px solid #D6300F" }}>
    <Card.Header style={{backgroundColor:'#D6300F', color:'white'}}>date <span style={{float:'right'}}>hour</span></Card.Header>
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