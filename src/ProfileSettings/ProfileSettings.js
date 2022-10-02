import { useReducer, useEffect, useContext, useState } from 'react'
import { Context } from '../App'
import { Container, Card, Form, Row, Col, Image, Modal, Button, ListGroup } from 'react-bootstrap'
import { BsFillTrashFill } from "react-icons/bs"
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll'


const ProfileSettings = () => {
// state hooks and variable declaration
//===========================================================================
    const { defaultImage, loggedInUser }  = useContext(Context)
    // Initial State for userSettings
    const initialState = {
        profileimg: '',
        about: '',
        location: '',
        displayname: '',
        email: '',
        likedrestaurants: ''
    }
    const [userData, dispatch] = useReducer(axiosReducer, initialState)
    const [reload, setReload] = useState(true)
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        userData.response && dispatch({
            key: 'loadProfile',
            value: {
                profileimg: userData.response.profileimg,
                about: userData.response.about,
                location: userData.response.location,
                displayname: userData.response.displayname,
                email: userData.response.email,
                likedrestaurants: userData.response.likedrestaurants
            }
        })
    },[userData.response])


// Getting user data
// ===========================================================================

    useEffect(()=> {
        axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatch)
    },[reload])

    function onDelete(e) {
        e.preventDefault()
        axiosAll('DELETE', `/users/${userData.response._id}/likedrestaurants/${e.target.classList[0]}`, loggedInUser.token)
        const likedrestaurants = userData.likedrestaurants
        likedrestaurants.map(restaurant => {
            if(restaurant._id === e.target.classList[0]) return
            return restaurant
        })
    }

// Event Handler Functions
//===========================================================================
    function inputChange(e) {
        dispatch({
            key: e.target.classList[0],
            value: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        axiosAll('PUT', `/users/${userData.response._id}`, loggedInUser.token, dispatch, userData)
    }
    
    function handleShow() {
        setModalShow(!modalShow)
    }
    // function uploadHandler(imageList) {
    //     setImage(imageList)
    //   }

    
// Conditional Rendering
    if (userData)
    return (
        <Container style={{ marginTop: '18vh', border: '1px solid #EB3510', boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)', borderRadius:'10px'}}>
        <Card style={{border: 'none'}} className="fluid px-4 py-4">
            <Row>
                <Col style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #EB3510' }}>
                            
                <Image 
                    className="profileimg"
                    src={userData.profileimg || defaultImage} 
                    alt="profile-image"
                    width={200}
                    height={200}
                    style={{border: '1px solid #EB3510', margin: '1rem', borderRadius: '5px'}}></Image>
                    <Form.Control className="profileimg"
                        type="profile-image" 
                        placeholder="paste a picture URL here"
                        onChange={inputChange}  
                        value={userData.profileimg}
                        style={{width: '105%'}}
                    />
                    <Form.Text className="text-muted">only JPG and PNG files supported.</Form.Text>
                    <h3 style={{marginTop:'1rem'}}>{userData.username}</h3>
                    <Form> 
                        <Form.Label>about me</Form.Label>
                        <Form.Control  
                        className="about"
                        as="textarea" 
                        rows={3}
                        type="about-me" 
                        placeholder="write your about me here for others to see"
                        onChange={inputChange}  
                        value={userData.about}
                        style={{width: '105%'}}
                        />
                        <Form.Text className="text-muted d-block mt-3">maximum length: 500 characters</Form.Text>
                        <Button variant="danger" 
                        type="submit"
                        id="save-changes"
                        onClick={onSubmit}
                        style={{marginTop: '1rem',backgroundColor:'#EB3510', borderColor: '#D6300F'}}
                        >save changes</Button>
                    </Form>
                </Col>
                <Col style={{textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Form style={{paddingLeft: '4rem'}}>
                        <Row>
                            <Form.Label>location</Form.Label>
                            <Form.Control 
                            className="location"
                            type="location" 
                            placeholder="eg. los angeles, california"
                            onChange={inputChange}
                            value={userData.location}
                            style={{border: '1px solid #EB3510', width: '70%'}}
                            />
                            <Form.Label style={{marginTop:'2rem'}}>display name</Form.Label>
                            <Form.Control 
                            className="displayname" 
                            type="display-name"
                            placeholder="change display name"
                            onChange={inputChange}
                            value={userData.displayname}
                            style={{border: '1px solid #EB3510', width: '70%'}}
                            />
                            <Form.Text className="text-muted">this will be the name other users see when they view your profile.</Form.Text>
                        </Row>
                        <Row>
                            <Form.Label style={{marginTop:'2rem'}}>email</Form.Label>
                            <Form.Control 
                            className="email"
                            type="email-address" 
                            placeholder="Change your email address"
                            onChange={inputChange}
                            value={userData.email}
                            style={{border: '1px solid #EB3510', width: '70%'}}
                            />
                        </Row>
                    </Form>
                            <Button variant="danger" style={{width: 'auto', marginLeft:'2rem', backgroundColor:'#EB3510', borderColor: '#D6300F', marginTop:'5rem'}} onClick={handleShow}>edit liked restaurants</Button>
                            <Modal 
                                show={modalShow}
                                onHide={handleShow}
                                animation={false}
                                size="md"
                                aria-labelledby="likedrestaurants-modal"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="likedrestaurants-modal">
                                        liked restaurants
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ListGroup>
                                        {userData.likedrestaurants && userData.likedrestaurants.map(likedrestaurant => (
                                            <div>
                                                <ListGroup.Item>{likedrestaurant.name}</ListGroup.Item>
                                                <BsFillTrashFill 
                                                    className={likedrestaurant._id}
                                                    type="delete-likedrestaurant"
                                                    onClick={onDelete}
                                                />
                                            </div>
                                        ))}
                                        
                                    </ListGroup>
                                </Modal.Body>
                            </Modal>
                </Col>
            </Row>
        </Card>
    </Container>
    )
}

export default ProfileSettings