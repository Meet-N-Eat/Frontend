import { useContext, useEffect, useReducer } from 'react'
import { Container } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import FriendRequest from './FriendRequest'

function FriendRequests() {
  const { loggedInUser } = useContext(Context)
  const [ friendRequests, dispatchRequests ] = useReducer(axiosReducer, [])

  useEffect(() => {
    axiosAll('GET', `/users/${loggedInUser.response._id}/friendInvites`, loggedInUser.token, dispatchRequests)
  },[])

  return (
    <Container>
      {loggedInUser.token && 
        friendRequests.response && friendRequests.response.length > 0 ? 
          friendRequests.response.map(friendRequest => <FriendRequest key={friendRequest._id} friendRequest={friendRequest} />)
          : <div>you don't have any invites right now</div>
      }
    </Container>
  )
}

export default FriendRequests
