import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Dropdown } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll } from '../../data-and-functions/axiosAll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import ProfileCard from '../ProfileCard'

function Messages() {
  const { loggedInUser, dispatchUser } = useContext(Context)

  useEffect(() => {
    axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
  },[])

  // Creates one thread for each unique sender, and stores the last message in the thread
  function groupThreads() {
    const threads = {}
    const threadArray = []

    loggedInUser.response.messages.forEach(message => {
      // if(!threads[message.sender]) threads[message.sender] = message
      // else if(threads[message.sender].createdAt < message.createdAt) threads[message.sender] = message
      threads[message.sender] = message
    })

    for(const thread in threads) threadArray.push(threads[thread])

    return threadArray
  }

  return (
    <Container>
      <div>
        <Dropdown>
          <Dropdown.Toggle>
            <FontAwesomeIcon icon={faMessage}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {loggedInUser.response && loggedInUser.response.friends.map(friend => <Link to={`/messages/chat/${friend._id}`} key={friend._id}><ProfileCard user={friend} /></Link>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {loggedInUser.token && groupThreads().map(message => <Message key={message._id} message={message} />)}
    </Container>
  )
}

export default Messages
