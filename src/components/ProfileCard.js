import {useEffect, useReducer, useContext} from "react"
import defaultImage from "../assets/defaultImage.png"
import {axiosAll, axiosReducer} from "../data-and-functions/axiosAll"
import {Context} from "../App"

const ProfileCard = ({user}) => {
   const {loggedInUser} = useContext(Context)
   const [userInfo, dispatchUserInfo] = useReducer(axiosReducer, {})

   // get user by id call
   useEffect(() => {
      axiosAll("GET", `/users/${user}/profileCard`, loggedInUser.token, dispatchUserInfo)
   }, [])

   return (
      <div className="h-32 w-32 rounded-2xl grid justify-items-center space-y-2">
         {userInfo.response && (
            <>
               <div className='friend-image'>
                  <img src={userInfo.response.profileimg || defaultImage} alt='profile' className=''/>
               </div>
               <p className='font-normal'>{userInfo.response.displayname || userInfo.response.username}</p>
            </>
         )}
      </div>
   )
}
export default ProfileCard
