import React from 'react'
import { Card, InputGroup, Form, Button, ListGroup } from 'react-bootstrap'
import FriendCard from './FriendCard'
import { useState } from 'react'

const Friends = ( {friends} ) => {
    const [searchCharacters, setSearchCharacters] = useState('')

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
                    {friends && friends.length > 0 ?
                        friends.filter(friend => searchCharacters == '' || friend.username.toLowerCase().includes(searchCharacters.toLocaleLowerCase()))
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