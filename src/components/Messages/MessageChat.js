import { useEffect } from "react"
import { useReducer } from "react"
import { useContext } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Context } from "../../App"
import { axiosAll, axiosReducer } from "../../data-and-functions/axiosAll"
import { messageThreads } from "../../data-and-functions/messageThreads"
import Message from "./Message"


function MessageChat() {
  const { loggedInUser, dispatchUser } = useContext(Context)
  const { friendId } = useParams()

  const initialState = {
    sender: loggedInUser.response._id,
    recipient: friendId,
    body: ''
  }

  const [ message, dispatchMessage ] = useReducer(axiosReducer, initialState)
  const [ thread, dispatchThread ] = useReducer(axiosReducer, [])
  useEffect(() => console.log(message), [message])
  useEffect(() => {
    // add call to backend route for single thread
  }, [])
  
  function submitHandler(e) {
    e.preventDefault()
    axiosAll('POST', '/users/messages/new', loggedInUser.token, dispatchUser, message)
    dispatchMessage({
      key: 'initialize',
      value: initialState
    })
  }

  return (
    <div className="page-container">
      {thread.map(message => 
        <div key={message._id} className={`${message.sender == loggedInUser.response._id ? "user chat-message" : "friend chat-message"}`}>
          <Message message={message} />
        </div>
      )}
      <form onSubmit={submitHandler}>
        <input
          style={{ border: '1px solid black'}}
          type="text"
          onChange={(e) => dispatchMessage({ key: 'body', value: e.target.value})}
          value={message.body}
        />
        <button type="submit">send</button>
      </form>

    </div>
  )
}

export default MessageChat
