import React, { useContext, useReducer } from 'react'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { Context } from '../../App'
import { Spinner } from 'react-bootstrap'

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
    <div
    className='modals'
    onClick={modalHandler}>
      <div className='modals-content space-y-4'>
        {user && user.username ? (
        <>
        <p className='white-header text-white text-xl text-center'>Add {user.username} as friend</p>
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
        </>
        ) : ( <Spinner animation='border' variant="light"/> )}
      </div>
    </div>
  )
}
export default FriendRequestForm