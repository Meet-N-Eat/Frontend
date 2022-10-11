import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FriendRequestForm from './FriendRequests/FriendRequestForm';

function OutreachButtons( {friends, user} ) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  
  const handleMessage = () => {
    navigate(`/messages/chat/${user.id}`)
  }

  return (
    <div>
      {friends && friends === true ?
      <Button style={{color:'black'}} onClick={handleMessage}> Message {user.username}</Button>
      :
      <Button style={{color:'black'}} onClick={handleShow}>Add {user.username} as friend</Button> 
     }
      <Modal show={show} onHide={handleClose}>
        <FriendRequestForm user={user} />
      </Modal>
    </div>
  )
}

export default OutreachButtons
