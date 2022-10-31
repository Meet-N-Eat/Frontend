import { useContext } from "react"
import { Card, Button, Row, Col, Container } from "react-bootstrap"
import { formatDateTime } from "../../data-and-functions/formatDateTime"
import { axiosAll } from "../../data-and-functions/axiosAll"
import { Context } from "../../App"
import ProfileCard from "../ProfileCard"

const FriendRequest = ({ friendRequest, dispatchRequests }) => {
    const { loggedInUser } = useContext(Context)
    const [date, time] = formatDateTime(friendRequest.createdAt)

    async function inviteHandler(choice) {
        // if accept was clicked, add new friend
        choice == 'accept' && await axiosAll('POST', `/users/${loggedInUser.response._id}/friends/${friendRequest.sender}`, loggedInUser.token)
        
        // delete the friend request
        choice != '' && await axiosAll('DELETE', `/users/${loggedInUser.response._id}/friendInvites/${friendRequest._id}`, loggedInUser.token)

        // update loggedInUser once the appropriate action has been taken
        axiosAll('GET', `/users/${loggedInUser.response._id}/friendInvites`, loggedInUser.token, dispatchRequests)
    }

return (
   
    <Card className=''>
        <div>
            <ProfileCard user={friendRequest.sender} />
        </div>
        
        <Card.Body className='friend-card'>
            <Row>
                <Col>
                    <Card.Text>{friendRequest.body}</Card.Text>
                </Col>
                <Col>
                    <Container aria-label="Basic example">
                        <Button 
                            variant="secondary"
                            onClick={() => inviteHandler('accept')}                            
                        >accept</Button>
                        <Button 
                            variant="secondary"
                            onClick={() => inviteHandler('decline')}
                        >decline</Button>
                    </Container>
                </Col>
            </Row>
        </Card.Body>
    </Card>
)
}

export default FriendRequest