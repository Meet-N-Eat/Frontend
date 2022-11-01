import {  } from "react-bootstrap"
import { formatDateTime } from "../../data-and-functions/formatDateTime"
import ProfileCard from "../ProfileCard"

const Message = ({ message }) => {
    const [date, time] = formatDateTime(message.createdAt)

return (
    <div>
        <div>
            <ProfileCard user={message.sender} />
        </div>
        <div>
            <p>{message && message.body}</p>
        </div>
        <div>
            <div>{message && date}</div>
            <div>{message && time}</div>
        </div>
    </div>
)
}

export default Message