import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../App'


function OutreachButtons( {friends, user, friendRequestHandler} ) {
  const navigate = useNavigate()
  const { loggedInUser } = useContext(Context)
  
  const handleMessage = () => {
    navigate(`/messages/${user.id}`)
  }

  return (
    <div>
      {user._id !== loggedInUser.response._id &&
        (friends && friends === true ?
        <Button style={{color:'black'}} onClick={handleMessage}> Message {user.displayname || user.username}</Button>
        :
        <Button style={{color:'black'}} onClick={friendRequestHandler}>Add {user.displayname || user.username} as friend</Button>) 
     }
    </div>
  )
}

export default OutreachButtons
