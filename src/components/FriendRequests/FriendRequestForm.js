import React, { useContext, useReducer } from 'react'
import { Modal, Form, InputGroup, Button } from 'react-bootstrap'
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
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <InputGroup>
        <Form.Label>Message for {user.username}</Form.Label>
        <Form.Control className='body' as='textarea'></Form.Control>
      </InputGroup>
      <Modal.Footer>
        <Button> Submit </Button>
      </Modal.Footer>
    </div>
  )
}

export default FriendRequestForm
