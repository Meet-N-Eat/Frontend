import {useContext} from "react"
import {useNavigate} from "react-router-dom"
import {Context} from "../App"

function OutreachButtons({friends, user, friendRequestHandler}) {
   const navigate = useNavigate()
   const {loggedInUser} = useContext(Context)

   const handleMessage = () => {
      navigate(`/messages/${user.id}`)
   }

   return (
      <div>
         {user._id !== loggedInUser.response._id &&
            (friends && friends === true ? (
               <button onClick={handleMessage}> Message {user.displayname || user.username}</button>
            ) : (
               <button onClick={friendRequestHandler}>
                  Add {user.displayname || user.username} as friend
               </button>
            ))}
      </div>
   )
}

export default OutreachButtons
