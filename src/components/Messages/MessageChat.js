import { useEffect, useReducer, useContext } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../../App"
import { axiosAll, axiosReducer } from "../../data-and-functions/axiosAll"
import { messageThreads } from "../../data-and-functions/messageThreads"
import Message from "./Message"


function MessageChat() {
  const { loggedInUser } = useContext(Context)
  const { friendId } = useParams()

  const initialState = {
    sender: loggedInUser.response._id,
    recipient: friendId,
    body: ''
  }

  const [ message, dispatchMessage ] = useReducer(axiosReducer, initialState)
  const [ thread, dispatchThread ] = useReducer(axiosReducer, {})

  useEffect(() => {
    axiosAll('GET', `/users/${loggedInUser.response._id}/messages/${friendId}`, loggedInUser.token, dispatchThread)
  }, [])

  // sort messages into a chronological thread
  useEffect(() => {
    thread.response && messageThreads(thread, loggedInUser)
      .then(({ threadArray }) => {
        dispatchThread({
          key: 'threadArray',
          value: threadArray
        })
      })
  }, [thread.response])
  
  async function submitHandler(e) {
    e.preventDefault()
    // create new message
    await axiosAll('POST', '/users/messages/new', loggedInUser.token, null, message)
    // reset local message state
    await dispatchMessage({
      key: 'initialize',
      value: initialState
    })
    // update the thread to display the new message
    await axiosAll('GET', `/users/${loggedInUser.response._id}/messages/${friendId}`, loggedInUser.token, dispatchThread)
  }

  return (
    <div className="page-container">
      {thread.threadArray && thread.threadArray.length > 0 && thread.threadArray[0].map(message => 
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
