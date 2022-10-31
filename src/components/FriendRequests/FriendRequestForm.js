import React, { useContext, useReducer } from 'react'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { Context } from '../../App'

function FriendRequestForm( {user, modalHandler} ) {
  
  const { loggedInUser } = useContext(Context)

  const initialState = {
    sender: loggedInUser.response._id,
    body: ''
}

  const [request, dispatch] = useReducer(axiosReducer, initialState)

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

  return (
    <div>
      <div closeButton>
        <h1>Modal heading</h1>
      </div>
      <div>
        <label>Message for {user.username}</label>
        <input className='body' as='textarea'></input>
      </div>
      <div>
        <div> Submit </div>
      </div>
    </div>
  )
}

export default FriendRequestForm
