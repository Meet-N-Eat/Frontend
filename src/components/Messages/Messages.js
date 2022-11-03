import { useEffect, useContext, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import { messageThreads } from '../../data-and-functions/messageThreads'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import ProfileCard from '../ProfileCard'

function Messages() {
  const { loggedInUser } = useContext(Context)
  const [messages, dispatchMessages] = useReducer(axiosReducer, {})

  useEffect(() => {
    axiosAll('GET', `/users/${loggedInUser.response._id}/messages/all`, loggedInUser.token, dispatchMessages)
  },[])

  useEffect(() => {
    messages.response && messageThreads(messages, loggedInUser)
      .then(threadArray => {
        dispatchMessages({
          key: 'threadArray',
          value: threadArray
        })
      })
  }, [messages.response])

  return (
    <div className='centered bg-red-900/90 w-3/4 mx-auto flex flex-col p-4 rounded-2xl'> 
      <div className='w-full'>
        <Dropdown className='float-right outline-none'>
          <Dropdown.Toggle>
            <FontAwesomeIcon className='' icon={faMessage}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {loggedInUser.response && 
              loggedInUser.response.friends.map(friend => 
                <Link 
                  key={friend} 
                  to={`/messages/${friend}`} 
                >
                  <ProfileCard user={friend} />
                </Link>
              )
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {messages.threadArray && messages.threadArray.length > 0 ?
        messages.threadArray.map(thread => 
          <Link 
            className='flex flex-col w-full p-1 rounded-xl text-black m-1'
            key={thread[thread.length - 1]._id} 
            to={`/messages/${thread[0].sender != loggedInUser.response._id ? thread[0].sender : thread[0].recipient}`} 
          >
            <Message message={thread[thread.length - 1]} />
          </Link>
        )
        : <div>you don't have any messages, choose a friend from the list and start chatting!</div>
      }
    </div>
  )
}

export default Messages
