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
    console.log(loggedInUser.response)
    useEffect(() => {
        if(loggedInUser.response) {
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
        }
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
        <div className='centered main-bg rounded-2xl w-1/2 mx-auto'>
            {loggedInUser.response && 
                <>         
                    <div className='centered rounded-circle'>
                        <img className='rounded-circle mb-1 border-2 border-red-900' src={userData.profileimg || defaultImage} alt="profile-image"/>
                    </div>
                    <form className='flex flex-col text-white'> 
                        <input className="profileimg input"
                            type="profile-image" 
                            placeholder="paste a picture URL here"
                            onChange={inputChange}  
                            value={userData.profileimg}
                            />
                            <p className=" border-b-[1px] border-red-900 pb-1">only JPG and PNG files supported.</p>
                        <h3>{userData.username}</h3>
                        <label className=' mx-auto mt-1'>about me</label>
                        <textarea
                            rows='2'  
                            className="about input p-2 text-white focus:bg-red-900/60 focus:placeholder-white"
                            as="textarea" 
                            divs={3}
                            type="about-me" 
                            placeholder="write your about me here for others to see"
                            onChange={inputChange}  
                            value={userData.about}
                        />
                        <p className=" d-block border-b-[1px] border-red-900 pb-1">maximum length: 500 characters</p>
                            <div className='centered'>
                                <label className=' mt-1'>location</label>
                                <input 
                                    className="location input w-full text-white focus:bg-red-900/60 focus:placeholder-white"
                                    type="location" 
                                    placeholder="eg. los angeles, california"
                                    onChange={inputChange}
                                    value={userData.location}
                                />
                                <label className=''>display name</label>
                                <input 
                                    className="displayname input w-full text-white focus:bg-red-900/60 focus:placeholder-white" 
                                    type="display-name"
                                    placeholder="change display name"
                                    onChange={inputChange}
                                    value={userData.displayname}
                                />
                                <p className="">this will be the name other users see when they view your profile.</p>
                            </div>
                            <div className='centered'>
                                <label className=''>email</label>
                                <input 
                                    className="email input w-full text-white focus:bg-red-900/60 focus:placeholder-white"
                                    type="email-address" 
                                    placeholder="Change your email address"
                                    onChange={inputChange}
                                    value={userData.email}
                                />
                                {error && <p className="">this email address already exists, please enter another</p>}
                            </div>
                        <button 
                            className='account-button w-1/2 mx-auto mt-1'
                            type="submit"
                            id="save-changes"
                            onClick={onSubmit}
                        >save changes</button>
                    </form>
                </>
            }
        </div>
    )
}

export default UserProfile