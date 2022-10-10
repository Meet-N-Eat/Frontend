import { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll } from '../../data-and-functions/axiosAll'
import FriendRequest from './FriendRequest'

function FriendRequests() {
const { loggedInUser, dispatchUser } = useContext(Context)

useEffect(() => {
  axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
},[])

  return (
    <Container>
      {loggedInUser.token && loggedInUser.response.friendinvites.map(friendRequest => <FriendRequest key={friendRequest._id} friendRequest={friendRequest} />)}
    </Container>
  )
}

export default FriendRequests
