import { useContext, useEffect, useState } from "react"
import { Card, Button, Row, Col, Container } from "react-bootstrap"
import { Context } from "../../App"
import { formatDateTime } from "../../data-and-functions/formatDateTime"


const FriendRequest = ({ request, noImage }) => {
    const [choice, setChoice] = useState('')
    const [date, time] = formatDateTime(request.createdAt)
    const { defaultImage } = useContext(Context)


    function clickHandler(e) {
        setChoice(e.target.classList[0])
    }

    useEffect(() => {
        switch(choice) {
            case 'accept':
                // axios.put(`${url}/users/${request.recipient._id}`, { newFriend: request.sender_id, removeRequest: request._id})
                // setChoice('')
                break

            case 'decline':
                // axios.put(`${url}/users/${request.recipient._id}`, { removeRequest: request._id})
                // setChoice('')
                break

            default:
                break 
        }
    }, [choice])

return (
   
    <Card className='d-flex flex-row justify-content-center align-items-center' style={{ width: '90%', padding:'1%', marginTop: '1rem', border:'1px solid #D6300F'}}>
        <div style={{ width:'30%', textAlign: 'center', border: '1px solid #eb350f', borderRadius: '6px', boxShadow: '1px 1px 7px -2px rgba(0,0,0,0.75)' }} >

        
                <Card.Img style={{ width:'100%', borderBottom: '1px solid #eb350f', padding: '0.5rem', borderRadius: '0px' }}  src={request.sender.profileimg || defaultImage} />
            

            <Card.Text >{request && request.sender.displayname}</Card.Text>
        </div>
        
        <Card.Body className='friend-card'>
            <Row>
                <Col>
                    <Card.Text style={{ marginLeft: '1rem', width: '100%'}}>{request.message}</Card.Text>
                </Col>
                <Col>
                    <Container style={{marginTop: '0.3rem', display:'flex', flexDirection: 'column', justifyContent:'space-around', width:'80%', }} aria-label="Basic example">
                        <Button 
                            className='accept' 
                            style={{ marginBottom: '5%', backgroundColor:'#D6300F', border:'1px solid #D6300F' }} 
                            variant="secondary"
                            onClick={clickHandler}                            
                        >accept</Button>
                        <Button 
                            className='decline' 
                            variant="secondary"
                            onClick={clickHandler}
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