import { useLocation } from "react-router-dom"
import Message from "./Message"


function MessageChat() {
  const { state } = useLocation()
  console.log(state)

  return (
    <div>
      {state.map(message => <Message key={message._id} message={message} />)}
    </div>
  )
}

export default MessageChat
