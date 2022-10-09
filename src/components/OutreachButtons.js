import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function OutreachButtons( {friends, user} ) {

  const navigate = useNavigate()

  const handleMessage = () => {
    navigate(`/messages/chat/${user.id}`)
  }

  return (
    <div>
      {friends && friends == true ?
      <Button style={{color:'black'}} onClick={handleMessage}> Message {user.username}</Button>
      :
      <Button style={{color:'black'}}>Add {user.username} as friend</Button> 
     }
    </div>
  )
}

export default OutreachButtons
