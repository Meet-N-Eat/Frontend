import { useContext } from "react"
import { Card, Button, Row, Col, Container } from "react-bootstrap"
import { formatDateTime } from "../../data-and-functions/formatDateTime"
import { axiosAll, axiosReducer } from "../../data-and-functions/axiosAll"
import { Context } from "../../App"
import ProfileCard from "../ProfileCard"

const FriendRequest = ({ friendRequest }) => {
    const { loggedInUser, dispatchUser } = useContext(Context)
    const [date, time] = formatDateTime(friendRequest.createdAt)

    function inviteHandler(choice) {
        // if accept was clicked, add new friend
        choice == 'accept' && axiosAll('POST', `/users/${loggedInUser.response._id}/friends/${friendRequest.sender}`, loggedInUser.token, dispatchUser)
        
        // delete the friend request
        choice != '' && axiosAll('DELETE', `/users/${loggedInUser.response._id}/friendInvites/${friendRequest._id}`, loggedInUser.token, dispatchUser)
    }

return (
   
    <Card className='d-flex flex-row justify-content-center align-items-center' style={{ width: '90%', padding:'1%', marginTop: '1rem', border:'1px solid #D6300F'}}>
        <div style={{ width:'30%', textAlign: 'center', border: '1px solid #eb350f', borderRadius: '6px', boxShadow: '1px 1px 7px -2px rgba(0,0,0,0.75)' }} >
            <ProfileCard user={friendRequest.sender} />
        </div>
        
        <Card.Body className='friend-card'>
            <Row>
                <Col>
                    <Card.Text style={{ marginLeft: '1rem', width: '100%'}}>{friendRequest.body}</Card.Text>
                </Col>
                <Col>
                    <Container style={{marginTop: '0.3rem', display:'flex', flexDirection: 'column', justifyContent:'space-around', width:'80%', }} aria-label="Basic example">
                        <Button 
                            style={{ marginBottom: '5%', backgroundColor:'#D6300F', border:'1px solid #D6300F' }} 
                            variant="secondary"
                            onClick={() => inviteHandler('accept')}                            
                        >accept</Button>
                        <Button 
                            variant="secondary"
                            onClick={() => inviteHandler('decline')}
                            style={{ marginLeft: '1px', backgroundColor:'#D6300F', border:'1px solid #D6300F' }}
                        >decline</Button>
                    </Container>
                </Col>
            </Row>
        </Card.Body>
        {/* <Card.Footer>
            <Card.Text>{date}</Card.Text>
            <Card.Text>{time}</Card.Text>
        </Card.Footer> */}
    </Card>
)
}

export default FriendRequest