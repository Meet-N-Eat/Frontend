import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Context } from '../../App'
import OutreachButtons from '../OutreachButtons'
import ProfileCard from '../ProfileCard'
function UserLike({ user }) {
   const { loggedInUser, dispatchUser } = useContext(Context)
   const showInvite = false
   const showMessage = false
 
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   
   function friends() {
      if(loggedInUser.response.friends.find(friend => friend._id === user._id)) return true
      else return false
   }

   function clickHandler(e) {

      if(e.target !== window) friends() ? showMessage = true : showInvite = true
      else {
         showMessage = false
         showInvite = false
      }
   }

   return (
   <div style={{display:'flex', width:'auto', marginRight:"1%"}}>
      <div>
         <div onClick={handleShow}>
            <ProfileCard username={user.username} profileImg={user.profileimg}/>
         </div>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>{user.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{user.about}</Modal.Body>
            <Modal.Footer style={{display:"flex", flexDirection:'column', justifyContent:"center", alignItems:"center"}}>
               <OutreachButtons friends={friends()} user={user}/>
            </Modal.Footer>
         </Modal>
      </div>
   </div>
   )
}

 
export default UserLike

