import React, { useContext, useReducer } from 'react'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { Context } from '../../App'

function FriendRequestForm( {user, modalHandler} ) {
  // State Hooks and Variables
  // ===========================================================================
  const { loggedInUser } = useContext(Context)
  const initialState = {
    sender: loggedInUser.response._id,
    body: ''
  }
  const [request, dispatch] = useReducer(axiosReducer, initialState)

  // Event Handlers and Functions
  // ===========================================================================
  const handleChange = (e) => {
    dispatch({
      key: 'body',
      value: e.target.value
    })
  }

  const handleSubmit = () => {
    axiosAll('POST', `/users/${user._id}/friendInvites`, loggedInUser.token, dispatch, request)
    modalHandler()
  }

  // Return
  // ===========================================================================
  return (
    <div className='modals'>
        <div className='modals-content flex flex-col space-y-4'>
            <p className='text-white text-center font-normal'>Message for {user.username}</p>
            <input 
            className='input' 
            as='textarea'
            placeholder='optional message'
            onChange={handleChange}></input>
            <div className='flex justify-center'>
              <button className='button' onClick={handleSubmit}>Send</button>
            </div>
        </div>
    </div>
  )
}

export default FriendRequestForm
