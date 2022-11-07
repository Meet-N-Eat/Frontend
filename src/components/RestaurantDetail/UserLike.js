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
   function modalHandler() {
      setShow(prevState => !prevState)
   }
   
   function friends() {
      if(loggedInUser.response.friends.find(friend => friend === user._id)) return true
      else return false
   }

   function friendRequestHandler() {
      setFormSwitch(prevState => !prevState)
   }

   return (

   <div>
      <div className=''>
         <div onClick={modalHandler}>
            <ProfileCard user={user._id} />
         </div>

      </div>
      <Modal size='sm' show={show} onHide={() => setShow(false)}>
         {!formSwitch ?
            <div className='modal-bg border mt-36 mx-auto p-4 rounded-2xl w-72 h-60 text-white grid place-content-center'>
               <div className='grid place-content-center'>
                  <ProfileCard user={user._id} />
               </div>
            <p className='text-white'>{user.about}</p>
            <OutreachButtons friends={friends()} user={user} friendRequestHandler={friendRequestHandler} />
         </div>
            :
            <FriendRequestForm user={user} modalHandler={modalHandler} />
         }
      </Modal>
   </div>
   )
}

 
export default UserLike

