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
  
  return (
    <Container>
      {loggedInUser.token && loggedInUser.response.messages.map(message => <Message key={message._id} message={message} />)}
    </Container>
  )
}

export default Messages
