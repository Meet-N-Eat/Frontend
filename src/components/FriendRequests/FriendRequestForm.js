import React, { useContext, useReducer, useState } from 'react'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { Context } from '../../App'

function FriendRequestForm( {user, modalHandler} ) {
  
  const { loggedInUser } = useContext(Context)
  const [modalState, setModalState] = useState(false)

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
    <>
    <div 
    className='modals'
    onClick={modalHandler}>
        <div className='modals-content space-y-4'>
          <p className='header text-white text-xl text-center'>Add {user.username} as friend</p>
          <input 
          className='input w-full' 
          as='textarea'
          divs={3}
          placeholder='Send an optional message'
          maxlength='200'
          onChange={handleChange}></input>
          <p className='text-slate-300 text-sm'>maximum length: 200 characters</p>
          <div className='centered'>
            <button 
            className='button'
            onClick={handleSubmit}>Add friend</button>
          </div>
        </div>
    </div>
    </>
  )
}

export default FriendRequestForm
