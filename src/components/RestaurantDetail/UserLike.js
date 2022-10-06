import { useEffect } from 'react'
import { useContext } from 'react'
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Context } from '../../App'


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

   const renderTooltip = (props) => (
      <Tooltip style={{display:'flex', flexDirection:'column'}} id="button-tooltip" {...props}>
        <Button style={{border:'1px solid #D6300F', backgroundColor:'white', color:"black"}}>Add friend</Button><br></br>
        <Button style={{marginTop:'4%', border:'1px solid #D6300F', backgroundColor:'white', color:"black"}}>Message</Button>
      </Tooltip>
   ); 

  return (
   <OverlayTrigger placement='bottom' delay={{show:250, hide:3500}} overlay={renderTooltip}>
      <div style={{display:'flex', width:'auto', marginRight:"3%"}}>
         <div>
            <img src={user.profileimg || 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9JkaBnJ5fFI-FIGVM21jmBfS1HWlxWaAUDyaJQedJt2rc_RyW'} alt="" height="50px" width="50px" style={{borderRadius: '50%', aspectRatio: '1'}}/>
            <p>{user.username}</p>
            {/* Add modals which call SendFriendRequest or SendMessage here */}
         </div>
      </div>
   </OverlayTrigger>
  )
}

export default UserLike
