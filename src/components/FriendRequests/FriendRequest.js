import { useContext } from "react"
import { formatDateTime } from "../../data-and-functions/formatDateTime"
import { axiosAll } from "../../data-and-functions/axiosAll"
import { Context } from "../../App"
import ProfileCard from "../ProfileCard"

const FriendRequest = ({ friendRequest, dispatchRequests }) => {
    const { loggedInUser } = useContext(Context)
    const [date, time] = formatDateTime(friendRequest.createdAt)

    async function inviteHandler(choice) {
        // if accept was clicked, add new friend
        choice == 'accept' && await axiosAll('POST', `/users/${loggedInUser.response._id}/friends/${friendRequest.sender}`, loggedInUser.token)
        
        // delete the friend request
        choice != '' && await axiosAll('DELETE', `/users/${loggedInUser.response._id}/friendInvites/${friendRequest._id}`, loggedInUser.token)

        // update loggedInUser once the appropriate action has been taken
        axiosAll('GET', `/users/${loggedInUser.response._id}/friendInvites`, loggedInUser.token, dispatchRequests)
    }

return (
   
    <div className=''>
        <div>
            <ProfileCard user={friendRequest.sender} />
        </div>
        
        <div className='friend-card'>
            <div>
                <div>
                    <p>{friendRequest.body}</p>
                </div>
                <div>
                    <div aria-label="Basic example">
                        <button 
                            variant="secondary"
                            onClick={() => inviteHandler('accept')}>
                                accept
                        </button>
                        <button 
                            variant="secondary"
                            onClick={() => inviteHandler('decline')}>
                                decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}   

export default FriendRequest