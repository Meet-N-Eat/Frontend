import { useEffect, useReducer, useContext } from 'react'
import defaultImage from '../assets/defaultImage.png'
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll'
import { Context } from '../App'


const ProfileCard = ({ user }) => {
    const { loggedInUser } = useContext(Context)
    const [userInfo, dispatchUserInfo] = useReducer(axiosReducer, {})
    
    // get user by id call
    useEffect(() => {
        axiosAll('GET', `/users/${user}`, loggedInUser.token, dispatchUserInfo)
    }, [])

    useEffect(() => console.log('User by ID rendered'))

    return (
        <div>
            {userInfo.response && 
            <div>
                <div className='profile-image'>
                    <img src={userInfo.response.profileimg || user.profileimg || defaultImage} alt="profile" />
                </div>
                <p>{userInfo.response.displayname || user.displayname || userInfo.response.username}</p>
            </div>
            }
        </div>
    )
    }
    export default ProfileCard
