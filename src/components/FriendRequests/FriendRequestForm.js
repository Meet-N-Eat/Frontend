import React, { useState, useContext, useReducer } from 'react'
import { Modal, Form, InputGroup, Button } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { Context } from '../../App'

function FriendRequestForm( {user} ) {
  
  const { loggedInUser, dispatchUser } = useContext(Context)
  const [show, setShow] = useState(false);

  const initialState = {
    sender: loggedInUser.response.username,
    body: ''
}

  const [request, dispatch] = useReducer(axiosReducer, initialState)
  
  const handleChange = (e) => {
    dispatch({
      key: 'body',
      value: e.target.value
    })
    console.log(request)
  }
  
  const handleSubmit = () => {
    axiosAll('POST', `users/${user.id}/friendInvites`, loggedInUser.token, dispatch, request)
    setShow(false)
  }

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <InputGroup style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <Form.Label>Message for {user.username}</Form.Label>
        <Form.Control className='body' as='textarea' style={{width:'90%', marginBottom:'2%'}} value={request.body} onChange={handleChange}></Form.Control>
      </InputGroup>
      <Modal.Footer style={{display:'flex', justifyContent:'center'}}>
        <Button onClick={handleSubmit} style={{color:'black'}}> Submit </Button>
      </Modal.Footer>
    </div>
  )
}

export default FriendRequestForm
