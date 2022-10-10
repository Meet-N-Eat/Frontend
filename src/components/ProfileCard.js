import defaultImage from '../assets/defaultImage.png'

const ProfileCard = ({ user }) => {
    console.log(user)
return (
    <div>
        <div className='profile-image'>
            <img src={user.profileimg || defaultImage} alt="profile" />
        </div>
        <p>{user.displayname || user.username}</p>
    </div>
    //   <Card style={{ width: '4rem', height:'7rem', display:'flex', flexDirection:"column", justifyContent:"center", alignItems:'center'}}>
    //       <div className='profile-image'><img className='mt-2 mb-0' src={user.profileimg || defaultImage} /></div>
    //       <Card.Body style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    //           <Card.Title style={{width:'100%', textAlign:'center', paddingTop:'1%'}}>{user.displayname || user.username} </Card.Title>
    //       </Card.Body>
    //   </Card>
)
}
export default ProfileCard
