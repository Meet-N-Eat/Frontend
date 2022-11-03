import {  } from "react-bootstrap"
import { formatDateTime } from "../../data-and-functions/formatDateTime"
import ProfileCard from "../ProfileCard"

const Message = ({ message }) => {
    const [date, time] = formatDateTime(message.createdAt)

return (
    <div className="bg-slate-400/50 rounded-2xl flex p-2">
        <div>
            <ProfileCard user={message.sender} />
        </div>
        <div className="flex items-between w-full">
            <div className="w-3/4 p-2">
                <p>{message && message.body}</p>
            </div>
            <div className="w-1/4 flex flex-col">
                <div>{message && date}</div>
                <div>{message && time}</div>
            </div>
        </div>
    </div>
)
}

export default Message