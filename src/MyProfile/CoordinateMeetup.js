import React, { useContext, useEffect, useReducer } from 'react'
import { Card, Dropdown, Button } from 'react-bootstrap'
import { useState } from 'react'
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll'
import { Context } from '../App'

const CoordinateMeetup = ( {profile} ) => {
    const initialState = {
        friend: null,
        participant: null,
        restaurant: null,
        location: null,
        date: null
    }
    
    const [meetup, dispatch] = useReducer(axiosReducer, initialState)
    const { loggedInUser } = useContext(Context)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    console.log(meetup)
    console.log(profile)
    
    useEffect(() => {
        dispatch({
            key: 'date',
            value: combineDate(date, time)
        })
    }, [time])
    
    function combineDate(date, time) {
        const dateArr = date.split('-')
        const timeArr = time.split(':')
        const newDate = new Date(dateArr[0], dateArr[1], dateArr[2], timeArr[0], timeArr[1])
        
        return newDate
    }
    
    const friendSelect = (e) => {
        dispatch({
            key: 'friend',
            value: profile.friends.filter(friend => friend.username === e)[0].username
            })
        dispatch({
            key: 'participant',
            value: profile.friends.filter(friend => friend.username === e)[0]._id
            })

    }
    const restaurantSelect = (e) => {
        dispatch({
            key: 'location',
            value: profile.likedrestaurants.filter(restaurant => restaurant.name === e)[0]._id
        })
        dispatch({
            key: 'restaurant',
            value: profile.likedrestaurants.filter(restaurant => restaurant.name === e)[0].name
        })
    }
    const dateSelect = (e) => {
        setDate(e.target.value)
    }
    const timeSelect = (e) => {
        setTime(e.target.value)
    }

    const inviteHandler = () => {
        axiosAll('POST', `/users/events/sender/${profile._id}/restaurant/${meetup.location}`, loggedInUser.token, dispatch, { participants: meetup.participant })
    }


return (
    <Card style={{ width: '100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', border:'1px solid #D6300F' }}>
        <Card.Body>
            <Card.Title 
                style={{ textAlign:'center' }}>
                    coordinate meet 'n eat with friends
            </Card.Title>
            <div 
                style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', width:'105%', alignItems:'self-end' }} 
                className="input-group justify-content-between">
                <Dropdown  
                    onSelect={friendSelect}>
                    <Dropdown.Toggle  
                        style={{ width:'100%', border:'1px solid #D6300F', backgroundColor:'white', color:'black' }}  
                        variant="secondary" 
                        id="dropdown-basic">
                        {meetup.friend || 'choose friend'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        {profile && profile.friends.map(friend => <Dropdown.Item eventKey={friend.username} key={friend._id}>{friend.username}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown 
                    onSelect={restaurantSelect} 
                    style={{ marginTop:'5%'}}
                >
                    <Dropdown.Toggle 
                        style={{ width:'100%', border:'1px solid #D6300F', backgroundColor:'white', color:'black' }} 
                        variant="secondary" 
                        id="dropdown-basic">
                        { meetup.restaurant || 'choose restaurant' }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        { profile && profile.likedrestaurants.map((rest) => 
                            <Dropdown.Item 
                                eventKey={rest.name} 
                                key={rest._id}> 
                                {rest.name} 
                            </Dropdown.Item> )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <input 
                    style={{padding:'1%', borderRadius:'5px', border:"1px solid #D6300F"}} 
                    onChange={dateSelect} 
                    type='date'>
                </input>
                <input 
                    style={{padding:'1%', borderRadius:'5px', border:"1px solid #D6300F"}} 
                    onChange={timeSelect} 
                    type='time'>
                </input>
                </div>
                <Button 
                    style={{ width:'100%', marginTop:'5%', backgroundColor:'#D6300F', border:'none' }} 
                    id="button-addon2"
                    onClick={inviteHandler}
                >
                        invite
                </Button>
        </Card.Body>
    </Card>
)
}

export default CoordinateMeetup
