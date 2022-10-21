import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { Context } from "../../App"
import Message from "./Message"


function MessageChat() {
  const { loggedInUser } = useContext(Context)
  const { state } = useLocation()
  console.log(state)

  return (
    <div className="page-container">
      {state.map(message => 
        <div className={`${message.sender == loggedInUser.response._id ? "user message" : "friend message"}`}>
          <Message key={message._id} message={message} />
        </div>
      )}
    </div>
  )
}

export default MessageChat
