import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Dropdown } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import ProfileCard from '../ProfileCard'
import { useReducer } from 'react'

function Messages() {
  const { loggedInUser, dispatchUser } = useContext(Context)
  const [messages, dispatchMessages] = useReducer(axiosReducer, {})

  useEffect(() => {
    axiosAll('GET', `/users/${loggedInUser.response._id}/messages/all`, loggedInUser.token, dispatchMessages)
  },[])

  // Creates one thread for each unique sender, and stores the last message in the thread
  async function messageThreads() {
    // sort messages by date
    const sortedMessages = messages.response.sort((a, b) => a.createdAt < b.createdAt ? -1 : (a.createdAt === b.createdAt ? 0 : 1))
    const threads = {}

    // create unique keys for each thread and store the messages for that thread
    sortedMessages.forEach(message => {
      if(message.sender !== loggedInUser.response._id) {
        threads[message.sender] ?
          threads[message.sender].push(message)
          : threads[message.sender] = [ message ]
      } else {
        threads[message.recipient] ?
          threads[message.recipient].push(message)
          : threads[message.recipient] = [ message ]
      }
    })

    return threads
  }
  messageThreads()
  return (
    <Container>
      {/* <div>
        <Dropdown>
          <Dropdown.Toggle>
            <FontAwesomeIcon icon={faMessage}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {loggedInUser.response && loggedInUser.response.friends.map(friend => <Link to={`/messages/chat/${friend._id}`} key={friend._id}><ProfileCard user={friend} /></Link>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {loggedInUser.token && messageThreads().map(message => <Message key={message._id} message={message} />)} */}
    </Container>
  )
}

export default Messages
