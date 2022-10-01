import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const ProfileCard = ( {profile} ) => {
    const { username, about, profileimg, location } = profile

return (
    
    <Card 
        style={{ width: '90%', padding:'3%', border:'none'}}
    >
        <Card.Img 
            className='mt-5 mb-0'
            style={{borderRadius:'50%', border:'1px solid #D6300F'}} 
            variant="top" 
            src={profileimg} />
        <Card.Body 
            style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Card.Title 
                style={{borderTop:'1px solid #D6300F', width:'80%', textAlign:'center',paddingTop:'3%'}}>{username}
            </Card.Title>
            <Card.Text>
                {location}
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <p 
            style={{ textAlign:'center', fontWeight:'500' }}>about</p>
            <Card.Body>
                <ListGroup.Item 
                    style={{ border:'1px solid #D6300F'}}>
                    {about}
                </ListGroup.Item>
            </Card.Body>
        </ListGroup>
    </Card>
)
}

export default ProfileCard