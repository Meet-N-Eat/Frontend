import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Card, Dropdown, Button, Modal, Form } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import { Context } from '../../App'
import ProfileCard from '../ProfileCard'
import RestaurantCard from '../RestaurantCard'

const CoordinateMeetup = ({ loggedInUser }) => {
    // const { loggedInUser } = useContext(Context)

    const initialState = {
        restaurant: null,
        participants: [loggedInUser._id],
        date: null,
        createdBy: loggedInUser._id
    }
    
    const [meetup, dispatchMeetup] = useReducer(axiosReducer, initialState)
    const [showModal, dispatchModal] = useReducer(axiosReducer, { invite: false, invited: false})
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => console.log(meetup.restaurant))

    useEffect(() => {
        dispatchMeetup({
            key: 'date',
            value: combineDate(date, time)
        })
    }, [date, time])
    
    function combineDate(date, time) {
        const dateArr = date.split('-')
        const timeArr = time.split(':')
        const newDate = new Date(dateArr[0], dateArr[1]-1, dateArr[2], timeArr[0], timeArr[1])
        
        return newDate
    }
    
    const inviteHandler = (friend) => {
        // Determine if the friend is already invited to the event
        const invited = meetup.participants.find(participant => participant === friend._id)

        // If friend is already invited, remove them from participants, otherwise add them to participants
        dispatchMeetup({
            key: 'participants',
            value: invited 
                ? meetup.participants.filter(participant => participant != friend._id) 
                : [...meetup.participants, friend._id]
        })
    }

    const modalHandler = (e) => {
        // Close any open modals or open the appropriate modal
        if(showModal.invite === true || showModal.invited === true) {
            for(const key in showModal){
                dispatchModal({
                    key: key,
                    value: false
                })
            }
        } else {
            dispatchModal({
                key: e.target.classList[0],
                value: !showModal[e.target.classList[0]]
            })
        }
    }

    const restaurantSelect = (e) => {
        dispatchMeetup({
            key: 'restaurant',
            value: e
        })
    }

    const dateSelect = (e) => {
        setDate(e.target.value)
    }

    const timeSelect = (e) => {
        setTime(e.target.value)
    }

    const createEventHandler = () => {
        axiosAll('POST', `/users/events/create`, loggedInUser.token, dispatchMeetup, meetup)
    }

return (
    <Card style={{ width: '100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', border:'1px solid #D6300F' }}>
        <Card.Body>
            <Card.Title 
                style={{ textAlign:'center' }}>
                    coordinate meet 'n eat with friends
            </Card.Title>
            <Button 
                className='invite'
                style={{ width:'100%', marginTop:'5%', backgroundColor:'#D6300F', border:'none' }} 
                onClick={modalHandler}
            >
                    invite friends
            </Button>
            <Modal show={showModal.invite} onHide={modalHandler}>
                <Modal.Body>
                    {loggedInUser.friends.map((friend, index) => 
                        <>
                            <ProfileCard key={friend._id} user={friend} />
                            <Form.Check
                                key={index}
                                type='switch'
                                id='invite-toggle'
                                label='invite'
                                defaultChecked={meetup.participants.find(participant => participant === friend._id)}
                                onClick={() => inviteHandler(friend)}
                            />
                        </>
                    )}
                </Modal.Body>
            </Modal>
            <Button 
                className='invited'
                style={{ width:'100%', marginTop:'5%', backgroundColor:'#D6300F', border:'none' }} 
                onClick={modalHandler}
            >
                    who's invited?
            </Button>
            <Modal show={showModal.invited} onHide={modalHandler}>
                <Modal.Body>
                    {loggedInUser.friends
                        .filter(friend => meetup.participants
                            .find(participant => participant === friend._id))
                        .map(friend => <ProfileCard key={friend._id} user={friend} />)}
                </Modal.Body>
            </Modal>
            <div 
                style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', width:'105%', alignItems:'self-end' }} 
                className="input-group justify-content-between">
                <Dropdown 
                    onSelect={restaurantSelect} 
                    style={{ marginTop:'5%'}}
                >
                    <Dropdown.Toggle 
                        style={{ width:'100%', border:'1px solid #D6300F', backgroundColor:'white', color:'black' }} 
                        variant="secondary" 
                        id="dropdown-basic"
                    >
                        {   
                            // Displays name of selected restaurant, or 'choose restaurant'
                            meetup.restaurant 
                            && loggedInUser.favorites.find(restaurant => restaurant._id === meetup.restaurant).name 
                            || 'choose restaurant' 
                        }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        { loggedInUser && loggedInUser.favorites.map(restaurant => 
                            <Dropdown.Item 
                                key={restaurant._id}
                                eventKey={restaurant._id} 
                            > 
                                {restaurant.name} 
                            </Dropdown.Item> )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                {
                    meetup.restaurant && 
                    <RestaurantCard 
                        restaurant={loggedInUser.favorites.find(favorite => favorite._id == meetup.restaurant)}
                        hideLikeButton={true}
                    />
                }
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
                    onClick={createEventHandler}
                >
                        invite
                </Button>
        </Card.Body>
    </Card>
)
}

export default CoordinateMeetup
