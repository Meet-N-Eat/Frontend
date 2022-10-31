import { useContext, useEffect, useReducer } from 'react'
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
    <div>
      {loggedInUser.token && 
          friendRequests.response && friendRequests.response.length > 0 ? 
            friendRequests.response.map(friendRequest => <FriendRequest key={friendRequest._id} friendRequest={friendRequest} dispatchRequests={dispatchRequests} />)
            : <div>you don't have any invites right now</div>
      }
    </div>
  )
}

export default FriendRequests
