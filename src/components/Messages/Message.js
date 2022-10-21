import { useReducer, useEffect, useContext } from "react"
import { Card, ListGroup } from "react-bootstrap"
import { Context } from "../../App"
import { formatDateTime } from "../../data-and-functions/formatDateTime"
import { axiosAll, axiosReducer } from "../../data-and-functions/axiosAll"
import ProfileCard from "../ProfileCard"

const Message = ({ message }) => {
    const { loggedInUser } = useContext(Context)
    const [sender, dispatch] = useReducer(axiosReducer, {})
    const [date, time] = formatDateTime(message.createdAt)

    useEffect(() => {
        axiosAll('GET', `/users/${message.sender}`, loggedInUser.token, dispatch)
    },[])

return (
    <Card style={{ width: '100%',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:'1%' }}>
        <div style={{ width:'20%'}} >
            {sender.response && <ProfileCard user={sender.response} />}
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