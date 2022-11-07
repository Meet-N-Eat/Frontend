import { useContext, useEffect, useReducer } from 'react'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import FriendRequest from './FriendRequest'

function FriendRequests() {
  // State Hooks and Variables
  // ===========================================================================
  const { loggedInUser } = useContext(Context)
  const [ friendRequests, dispatchRequests ] = useReducer(axiosReducer, [])

  useEffect(() => {
    axiosAll('GET', `/users/${loggedInUser.response._id}/friendInvites`, loggedInUser.token, dispatchRequests)
  },[])

  // Return
  // ===========================================================================
  return (
    <div className='flex items-center justify-center row-start-2'>
      <div className='main-bg opacity-90 rounded-2xl px-6 md:px-14 py-4 md:py-5 space-y-4 w-80 md:w-[36rem] max-h-96 md:max-h-[80vh] overflow-y-auto'>
        {loggedInUser.token && 
            friendRequests.response && friendRequests.response.length > 0 ? 
              friendRequests.response.map(friendRequest => <FriendRequest key={friendRequest._id} friendRequest={friendRequest} dispatchRequests={dispatchRequests} />)
              : <p className='text-center text-white text-sm md:text-base'>you don't have any invites right now</p>
        }
      </div>
    </div>
  )
}

export default FriendRequests
