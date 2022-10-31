import { useReducer, useEffect, useContext, useState } from 'react'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'


const UserProfile = () => {
// state hooks and variable declaration
//===========================================================================
    const initialState = {
        profileimg: '',
        about: '',
        location: '',
        displayname: '',
        email: ''
    }

    const { defaultImage, loggedInUser, dispatchUser } = useContext(Context)
    const [userData, dispatch] = useReducer(axiosReducer, initialState)
    const [error, setError] = useState(false)

// Getting user data
// ===========================================================================

    useEffect(()=> {
        axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
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
        axiosAll('PUT', `/users/${loggedInUser.response._id}`, loggedInUser.token, null, userData)
            .then(res => {
                typeof(res.data) === 'string' ?
                    setError(true)
                    : setError(false)
                
                axiosAll('GET', `/users/${loggedInUser.response._id}`, loggedInUser.token, dispatchUser)
            })
    }

    return (
        <div>
            {userData && <div>         
                <div className='profile-image'>
                    <img src={userData.profileimg || defaultImage} alt="profile-image"/>
                </div>
                <form> 
                    <input className="profileimg"
                        type="profile-image" 
                        placeholder="paste a picture URL here"
                        onChange={inputChange}  
                        value={userData.profileimg}
                    />
                    <p className="text-muted">only JPG and PNG files supported.</p>
                    <h3>{userData.username}</h3>
                    <label>about me</label>
                    <input  
                        className="about"
                        as="textarea" 
                        divs={3}
                        type="about-me" 
                        placeholder="write your about me here for others to see"
                        onChange={inputChange}  
                        value={userData.about}
                    />
                    <p className="text-muted d-block mt-3">maximum length: 500 characters</p>
                        <div>
                            <label>location</label>
                            <input 
                                className="location"
                                type="location" 
                                placeholder="eg. los angeles, california"
                                onChange={inputChange}
                                value={userData.location}
                            />
                            <label>display name</label>
                            <input 
                                className="displayname" 
                                type="display-name"
                                placeholder="change display name"
                                onChange={inputChange}
                                value={userData.displayname}
                            />
                            <p className="text-muted">this will be the name other users see when they view your profile.</p>
                        </div>
                        <div>
                            <label>email</label>
                            <input 
                                className="email"
                                type="email-address" 
                                placeholder="Change your email address"
                                onChange={inputChange}
                                value={userData.email}
                            />
                            {error && <p className="text-muted">this email address already exists, please enter another</p>}
                        </div>
                    <button 
                        type="submit"
                        id="save-changes"
                        onClick={onSubmit}
                    >save changes</button>
                </form>
            </div>}
        </div>
    )
}

export default UserProfile