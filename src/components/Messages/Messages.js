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
  useEffect(() => console.log(messages.threads),[messages.threads])
  useEffect(() => {
    messages.response && messageThreads()
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

  // Creates one thread for each unique sender, and stores the last message in the thread
  async function messageThreads() {
    // sort messages by date
    const sortedMessages = messages.response.sort((a, b) => a.createdAt < b.createdAt ? -1 : (a.createdAt === b.createdAt ? 0 : 1))
    const threads = {}
    const threadArray = []

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

    for(const thread in threads) {
      threadArray.push(threads[thread])
    }

    return [threads, threadArray]
  }

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
                  to={`/messages/chat`} 
                  key={friend._id} 
                  thread={messages.threads && messages.threads[friend._id] ? messages.threads[friend._id] : []}
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
            to="/messages/chat" 
            key={thread[thread.length - 1]._id} 
            thread={thread}
          >
            <Message message={thread[thread.length - 1]} />
          </Link>
        )
      }
    </Container>
  )
}

export default Messages
