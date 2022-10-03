import { useEffect } from 'react'
import { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { Context } from '../../App'


function UserLike({ user }) {
   const { loggedInUser, dispatchUser } = useContext(Context)
   const showInvite = false
   const showMessage = false

   function friends() {
      if(loggedInUser.response.friends.find(friend => friend._id === user._id)) return true
      else return false
   }

   function clickHandler() {
     friends() ? showMessage = true : showInvite = true
   }

  return (
   <Col style={{ display: 'inline-block' }}>
      <img src={user.profileimg || 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9JkaBnJ5fFI-FIGVM21jmBfS1HWlxWaAUDyaJQedJt2rc_RyW'} alt="" height="50px" width="50px" style={{borderRadius: '50%', aspectRatio: '1'}}/>
      <p>{user.username}</p>
   </Col>
  )
}

export default UserLike
