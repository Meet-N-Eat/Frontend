import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Dropdown } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import { messageThreads } from '../../data-and-functions/messageThreads'
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

  useEffect(() => {
    messages.response && messageThreads(messages, loggedInUser)
      .then(([threads, threadArray]) => {
        dispatchMessages({
          key: 'threads',
          value: threads
        })
        dispatchMessages({
          key: 'threadArray',
          value: threadArray
        })
      })
  }, [messages.response])

  return (
    <Container>
      <div>
        <Dropdown>
          <Dropdown.Toggle>
            <FontAwesomeIcon icon={faMessage}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {loggedInUser.response && 
              loggedInUser.response.friends.map(friend => 
                <Link 
                  to={`/messages/${friend._id}`} 
                  key={friend._id} 
                >
                  <ProfileCard user={friend} />
                </Link>
              )
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {messages.threads && 
        messages.threadArray.map(thread => 
          <Link 
            to={`/messages/${thread[0].sender != loggedInUser.response._id ? thread[0].sender : thread[0].recipient}`} 
            key={thread[thread.length - 1]._id} 
          >
            <Message message={thread[thread.length - 1]} />
          </Link>
        )
      }
    </Container>
  )
}

export default Messages
