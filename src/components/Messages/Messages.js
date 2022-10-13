import { useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll } from '../../data-and-functions/axiosAll'
import Message from './Message'

function Messages() {
  const { loggedInUser, dispatchUser } = useContext(Context)

  useEffect(() => {
    axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
  },[])

  function groupThreads() {
    const threads = {}
    const threadArray = []

    loggedInUser.response.messages.forEach(message => {
      // if(!threads[message.sender]) threads[message.sender] = message
      // else if(threads[message.sender].createdAt < message.createdAt) threads[message.sender] = message
      threads[message.sender] = message
    })

    for(const thread in threads) threadArray.push(threads[thread])
    console.log(threadArray)
    return threadArray
  }
  groupThreads()
  return (
    <Container>
      {loggedInUser.token && groupThreads().map(message => <Message key={message._id} message={message} />)}
    </Container>
  )
}

export default Messages
