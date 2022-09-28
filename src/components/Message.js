import { Card, ListGroup } from "react-bootstrap"
import { formatDateTime } from "../data-and-functions/formatDateTime"

const Message = ({ message, noImage }) => {
    const [date, time] = formatDateTime(message.createdAt)

return (
    <Card style={{ width: '70%',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:'1%' }}>
        <div style={{ width:'20%'}} >
            <Card.Img style={{ width:'60%' }} variant="top" src={message.sender.profileimg || noImage } />
            <Card.Text>{message && message.sender.displayname}</Card.Text>
        </div>
        <Card.Body>
            <Card.Text>{message && `subject: ${message.subject}`}</Card.Text>
            <Card.Text>{message && message.body}</Card.Text>
        </Card.Body>
            <Card.Footer>
                <ListGroup.Item>{message && date}</ListGroup.Item>
                <ListGroup.Item>{message && time}</ListGroup.Item>
            </Card.Footer>
    </Card>
)
}

export default Message