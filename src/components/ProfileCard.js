import React, { useState, useContext } from 'react'
import { Card, Modal, Button } from 'react-bootstrap'
import { Context } from '../App'
 
const ProfileCard = ( { username, profileImg, user } ) => {
   // const { username, profileimg} = profile
   const { loggedInUser, dispatchUser } = useContext(Context)
   //modal handler
   const [show, setShow] = useState(false);
 
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
 
  function friends() {
   if(loggedInUser.response.friends.find(friend => friend._id === user._id)) return true
   else return false
}
 
let isFriend = friends()
console.log(isFriend)
return (
   <div style={{ width: '4rem', height:'100%', display:'flex', flexDirection:"column", justifyContent:"center", alignItems:'center'}}>
       <Card style={{ width: '4rem', height:'100%', display:'flex', flexDirection:"column", justifyContent:"center", alignItems:'center'}} onClick={handleShow}>
           <Card.Img
               className='mt-2 mb-0'
               style={{borderRadius:'50%', border:'1px solid #D6300F', width:"50px"}}
               src={profileImg} />
           <Card.Body style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
               <Card.Title style={{width:'100%', textAlign:'center', paddingTop:'1%'}}>{username}
               </Card.Title>
           </Card.Body>
       </Card>
       <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
           <Modal.Title>{username}</Modal.Title>
           </Modal.Header>
           <Modal.Body>{user.about}</Modal.Body>
           <Modal.Footer style={{display:"flex", flexDirection:'column', justifyContent:"center", alignItems:"center"}}>
               {/* Conditional rendering: If user is a friend button should say "message", if user isn't a friend button should say "Add friend" */}
               {isFriend && isFriend == true ?
               <Button onClick={handleClose} style={{color:'black'}}>Message {username}</Button>
               :
               <Button onClick={handleClose} style={{color:'black'}}>Add {username} as friend</Button>
               }
           </Modal.Footer>
       </Modal>
   </div>
)
}
 
export default ProfileCard