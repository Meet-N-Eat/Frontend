import defaultImage from '../assets/defaultImage.png'

const ProfileCard = ({ user }) => {

return (
    <div>
        <div className='profile-image'>
            <img src={user.profileimg || defaultImage} alt="profile" />
        </div>
        <p>{user.displayname || user.username}</p>
    </div>
)
}
export default ProfileCard
