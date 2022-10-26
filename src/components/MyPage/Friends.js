import { useState, useReducer, useContext, useEffect } from 'react'
import { Card, InputGroup, Form } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import { Context } from '../../App'
import FriendCard from './FriendCard'


const Friends = () => {

    const [searchCharacters, setSearchCharacters] = useState('')
    const [friends, dispatchFriends] = useReducer(axiosReducer, {})
    const { loggedInUser } = useContext(Context)

    useEffect(() => {
        axiosAll('GET', `/users/${loggedInUser.response._id}/friends`, loggedInUser.token, dispatchFriends)
    }, [])

    function searchChange(e) {
        setSearchCharacters(e.target.value)
    }

return (
    
    <Card className='friends' style={{ width: '80%', height:'80%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', border:'none'}}>
        <Card.Body>
            <Card.Body style={{width:'100%', heigth:'70%', marginTop:'10%'}}>
                <div>
                    <InputGroup 
                        style={{ margin:'2%', width:'90%'}} 
                        className="mb-3"
                    >
                        <InputGroup.Text 
                            style={{backgroundColor:'#D6300F', color:'white'}} 
                            id="basic-addon2"
                        >enter name</InputGroup.Text>
                        <Form.Control 
                            style={{border:'1px solid #D6300F'}} 
                            onChange={searchChange} 
                            placeholder="friends" 
                            aria-label="Recipient's username" aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    {friends.response && friends.response.friends.length > 0 ?
                        friends.response.friends.filter(friend => searchCharacters == '' || friend.username.toLowerCase().includes(searchCharacters.toLocaleLowerCase()))
                            .map(friend =>  <FriendCard key={friend._id} friend={friend} />)
                        : <div>you don't have any friends yet, send friend requests by clicking on other people who like the same restaurants you do.</div>
                    }
                </div>
            </Card.Body>
        </Card.Body>
    </Card>
)
}

export default Friends