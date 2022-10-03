import { useEffect } from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import Context from '../App'


function UserLikes({ user }) {
   // const friends = [friends, setFriends] = useState(false)
   // const { loggedInUser, dispatchUser } = useContext(Context)

   useEffect(() => {

   })
  return (
   <Container>
      <div style={{ width: '80%'}}>
         <img src={user.profileimg || 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9JkaBnJ5fFI-FIGVM21jmBfS1HWlxWaAUDyaJQedJt2rc_RyW'} alt="" width="50px" style={{borderRadius: '50%', aspectRatio: '1'}}/>
         <span>{user.username}</span>
      </div>
      {/* {!friends} */}
      <button>
      </button>
   </Container>
  )
}

export default UserLikes
