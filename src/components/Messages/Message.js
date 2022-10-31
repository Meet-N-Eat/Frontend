import { Card, ListGroup } from "react-bootstrap"
import { formatDateTime } from "../../data-and-functions/formatDateTime"
import ProfileCard from "../ProfileCard"

const Message = ({ message }) => {
    const [date, time] = formatDateTime(message.createdAt)

return (
    <Card>
        <div>
            <ProfileCard user={message.sender} />
        </div>
        <Card.Body>
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