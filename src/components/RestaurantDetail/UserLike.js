import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Context } from '../../App'
import ProfileCard from '../ProfileCard'
 
 
function UserLike({ user }) {
  const { loggedInUser, dispatchUser } = useContext(Context)
  const showInvite = false
  const showMessage = false
 
  function friends() {
     if(loggedInUser.response.friends.find(friend => friend._id === user._id)) return true
     else return false
  }
 
  function clickHandler(e) {
     // show appropriate modal based on friend status
     if(e.target !== window) friends() ? showMessage = true : showInvite = true
 
     // hide modal if user clicks outside of it
     else {
        showMessage = false
        showInvite = false
     }
  }
 
 
 return (
   <div style={{display:'flex', width:'auto', marginRight:"1%"}}>
      <div>
         <ProfileCard username={user.username} profileImg={user.profileimg} user={user}/>
         {/* Add modals which call SendFriendRequest or SendMessage here */}
      </div>
   </div>
 )
}
 
export default UserLike

