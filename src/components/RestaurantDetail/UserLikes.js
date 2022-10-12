import { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Context } from '../../App'
import FriendRequestForm from '../FriendRequests/FriendRequestForm'
import OutreachButtons from '../OutreachButtons'
import ProfileCard from '../ProfileCard'

function UserLike({ user }) {
   const { loggedInUser } = useContext(Context)
   const [formSwitch, setFormSwitch] = useState(false)
   const [show, setShow] = useState(false);
   const modalHandler = () => setShow(!show);
   
   function friends() {
      if(loggedInUser.response.friends.find(friend => friend._id === user._id)) return true
      else return false
   }

   function friendRequestHandler() {
      setFormSwitch(prevState => !prevState)
   }

   return (
   <div style={{display:'flex', width:'auto', marginRight:"1%"}}>
      <div>
         <div onClick={modalHandler}>
            <ProfileCard user={user} />
         </div>
         <Modal show={show} onHide={modalHandler}>
            {!formSwitch ?
            <>
               <Modal.Header closeButton>
                  <ProfileCard user={user} />
               </Modal.Header>
               <Modal.Body>{user.about}</Modal.Body>
               <Modal.Footer style={{display:"flex", flexDirection:'column', justifyContent:"center", alignItems:"center"}}>
                  <OutreachButtons friends={friends()} user={user} friendRequestHandler={friendRequestHandler} />
               </Modal.Footer>
            </>
            :
            <FriendRequestForm user={user} modalHandler={modalHandler} />
            }
         </Modal>
      </div>
   </div>
   )
}

 
export default UserLike
