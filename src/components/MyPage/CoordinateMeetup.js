import React, { useEffect, useReducer } from 'react'
import { Card, Dropdown, Button, Modal, Form } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import ProfileCard from '../ProfileCard'
import RestaurantCard from '../RestaurantCard'

const CoordinateMeetup = ({ loggedInUser, dispatchUser, showEdit, event }) => {
    // State Variables
    // ===========================================================================================
    const initialState = {
        restaurant: null,
        participants: [loggedInUser.response._id], 
        date: null,
        createdBy: loggedInUser.response._id
    }
    
    const [meetup, dispatchMeetup] = useReducer(axiosReducer, event || initialState)
    const [showModal, dispatchModal] = useReducer(axiosReducer, { invite: false, invited: false})
    const [date, dispatchDate] = useReducer(axiosReducer, {date: '', time: ''})
    const [error, dispatchError] = useReducer(axiosReducer, {date: false, restaurant: false})

    useEffect(() => console.log('CoordinateMeetup Rendered'))
    useEffect(() => console.log(meetup))
    useEffect(() => console.log(event))
    useEffect(() => console.log(loggedInUser.response))
    
    // Functions and Event Handlers
    // ===========================================================================================
    
    // Creates a date object from date and time inputs
    function combineDate(date, time) {
        const dateArr = date.split('-')
        const timeArr = time.split(':')
        const newDate = new Date(dateArr[0], dateArr[1]-1, dateArr[2], timeArr[0], timeArr[1])
        
        return newDate
    }

    // Populates "who's invited?" modal
    function participantsList() {
        let participants = loggedInUser.response.friends
        .filter(friend => meetup.participants
            .find(participant => participant === friend._id))
        .map(friend => <ProfileCard key={friend._id} user={friend} />)

        if(participants.length === 0) participants = (<h1>You're rollin' solo, invite some of your peeps!</h1>)

        return participants
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

    const inviteHandler = (friend) => {
        // Determine if the friend is already invited to the event
        const invited = meetup.participants.find(participant => participant === friend._id)

        // If friend is already invited, remove them from participants, otherwise add them to participants
        dispatchMeetup({
            key: 'participants',
            value: invited 
                ? meetup.participants.filter(participant => participant !== friend._id) 
                : [...meetup.participants, friend._id]
        })
    }

    const restaurantSelect = (e) => {
        dispatchMeetup({
            key: 'restaurant',
            value: e
        })
    }

    
    const dateSelect = (e, key) => {
        dispatchDate({
            key: key,
            value: e.target.value
        })
    }

    useEffect(() => {
        date.date && date.time &&
        dispatchMeetup({
            key: 'date',
            value: combineDate(date.date, date.time)
        })
    }, [date])

    const createEventHandler = () => {
        for(const key in meetup) {
                dispatchError({
                    key: key,
                    value:  meetup[key] === null ? true : false
                })
        }
        dispatchError({
            key: 'submit',
            value: true
        })
    }

    useEffect(() => {
        if(error.submit) {
            if(!error.date && !error.restaurant) {
                if(showEdit) axiosAll('POST', `/users/events/create`, loggedInUser.token, dispatchUser, meetup)
                else axiosAll('PUT', `/users/events/edit`, loggedInUser.token, dispatchUser, meetup)
                
                dispatchMeetup({
                    key: 'initialize',
                    value: initialState
                })

                dispatchDate({
                    key: 'initialize',
                    value: {date: '', time: ''}
                })
            }
        } else {
            error.submit = false
        }
    },[error])

return (
    <Card style={{ width: '100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', border:'1px solid #D6300F', marginBottom:'1%' }}>
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
                    {loggedInUser.response.friends.map((friend, index) => 
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
                    {participantsList()}
                </Modal.Body>
            </Modal>

            <div 
                style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', width:'105%', alignItems:'self-end' }} 
                className="input-group justify-content-between">
                
                {error.restaurant && <h2>select a restaurant for this event</h2>}
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
                            (meetup.restaurant && loggedInUser.response.favorites.find(restaurant => restaurant._id == meetup.restaurant).name)
                            || 'choose restaurant'
                        }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        { loggedInUser.response && loggedInUser.response.favorites.map(restaurant => 
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
                        restaurant={loggedInUser.response.favorites.find(favorite => favorite._id === meetup.restaurant)}
                        hideLikeButton={true}
                    />
                }

                {error.date && <h2>pick a date and time for this event</h2>}
                <input 
                    style={{padding:'1%', borderRadius:'5px', border:"1px solid #D6300F"}} 
                    onChange={(e) => dateSelect(e, 'date')} 
                    type='date'
                    value={date.date}
                />
                <input 
                    style={{padding:'1%', borderRadius:'5px', border:"1px solid #D6300F"}} 
                    onChange={(e) => dateSelect(e, 'time')} 
                    type='time'
                    value={date.time} 
                />
            </div>
                <Button 
                    style={{ width:'100%', marginTop:'5%', backgroundColor:'#D6300F', border:'none' }} 
                    id="button-addon2"
                    onClick={createEventHandler}
                >
                        {showEdit == true ? 
                        <p>edit event</p>
                    :
                        <p>create event</p>}
                </Button>
        </Card.Body>
    </Card>
)
}

export default CoordinateMeetup
