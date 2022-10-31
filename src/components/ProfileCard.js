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
      <div>
         {userInfo.response && (
            <div>
               <div className='profile-image'>
                  <img src={userInfo.response.profileimg || defaultImage} alt='profile' />
               </div>
               <p>{userInfo.response.displayname || userInfo.response.username}</p>
            </div>
         )}
      </div>
   )
}
export default ProfileCard
