import { useState, useReducer, useEffect } from 'react'
import { Card, InputGroup, Form } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import FriendCard from './FriendCard'


const Friends = ({ loggedInUser }) => {

    const [searchCharacters, setSearchCharacters] = useState('')
    const [friends, dispatchFriends] = useReducer(axiosReducer, {})

    useEffect(() => {
        axiosAll('GET', `/users/${loggedInUser.response._id}/friends`, loggedInUser.token, dispatchFriends)
    }, [])

    function searchChange(e) {
        setSearchCharacters(e.target.value)
    }

return (
    
    <Card className='friends'>
        <Card.Body>
            <Card.Body >
                <div>
                    <InputGroup
                        className=""
                    >
                        <InputGroup.Text 
                            id="basic-addon2"
                        >enter name</InputGroup.Text>
                        <Form.Control 
                            onChange={searchChange} 
                            placeholder="friends" 
                            aria-label="Recipient's username" aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    {friends.response && friends.response.length > 0 ?
                        friends.response.filter(friend => searchCharacters == '' || friend.username.toLowerCase().includes(searchCharacters.toLocaleLowerCase()))
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