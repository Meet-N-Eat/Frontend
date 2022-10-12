import { useReducer, useEffect, useContext } from 'react'
import { Container, Form, Row, Image, Button } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'


const UserProfile = () => {
// state hooks and variable declaration
//===========================================================================
    const { defaultImage, loggedInUser } = useContext(Context)
    const [userData, dispatch] = useReducer(axiosReducer, {})

// Getting user data
// ===========================================================================

    useEffect(()=> {
        axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatch)
    },[])

    useEffect(() => {
        const profileData = {
            profileimg: loggedInUser.response.profileimg,
            about: loggedInUser.response.about,
            location: loggedInUser.response.location,
            displayname: loggedInUser.response.displayname,
            email: loggedInUser.response.email
         }

        dispatch({
            key: 'initialize',
            value: profileData
        })
    },[loggedInUser.response])

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

    return (
        <Container style={{ marginTop: '18vh', border: '1px solid #EB3510', boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)', borderRadius:'10px'}}>
            <Row>         
                <div className='profile-image'>
                    <Image
                        src={userData.profileimg || defaultImage}
                        alt="profile-image"
                        />
                </div>
                <Form> 
                    <Form.Control className="profileimg"
                        type="profile-image" 
                        placeholder="paste a picture URL here"
                        onChange={inputChange}  
                        value={userData.profileimg}
                    />
                    <Form.Text className="text-muted">only JPG and PNG files supported.</Form.Text>
                    <h3 style={{marginTop:'1rem'}}>{userData.username}</h3>
                    <Form.Label>about me</Form.Label>
                    <Form.Control  
                        className="about"
                        as="textarea" 
                        rows={3}
                        type="about-me" 
                        placeholder="write your about me here for others to see"
                        onChange={inputChange}  
                        value={userData.about}
                    />
                    <Form.Text className="text-muted d-block mt-3">maximum length: 500 characters</Form.Text>
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
                    <Button 
                        variant="danger" 
                        type="submit"
                        id="save-changes"
                        onClick={onSubmit}
                        style={{marginTop: '1rem',backgroundColor:'#EB3510', borderColor: '#D6300F'}}
                    >save changes</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default UserProfile