import {useReducer, useEffect, useContext, useState} from 'react'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'

const UserProfile = () => {
	// state hooks and variable declaration
	//===========================================================================
	const initialState = {
		profileimg: '',
		about: '',
		location: '',
		displayname: '',
		email: '',
	}

	const {defaultImage, loggedInUser, dispatchUser} = useContext(Context)
	const [userData, dispatch] = useReducer(axiosReducer, initialState)
	const [error, setError] = useState(false)

	// Getting user data
	// ===========================================================================

	useEffect(() => {
		axiosAll(
			'GET',
			`/users/username/${loggedInUser.username}`,
			loggedInUser.token,
			dispatchUser
		)
	}, [])

	useEffect(() => {
		if (loggedInUser.response) {
			const profileData = {
				profileimg: loggedInUser.response.profileimg,
				about: loggedInUser.response.about,
				location: loggedInUser.response.location,
				displayname: loggedInUser.response.displayname,
				email: loggedInUser.response.email,
			}

			dispatch({
				key: 'initialize',
				value: profileData,
			})
		}
	}, [loggedInUser.response])

	// Event Handler and Functions
	//===========================================================================
	function inputChange(e) {
		if (e.target.classList[0] === 'about') {
			dispatch({
				key: 'about',
				value: e.target.value.slice(0, 501),
			})
		} else {
			dispatch({
				key: e.target.classList[0],
				value: e.target.value,
			})
		}
	}

	function onSubmit(e) {
		e.preventDefault()
		axiosAll(
			'PUT',
			`/users/${loggedInUser.response._id}`,
			loggedInUser.token,
			null,
			userData
		).then(res => {
			typeof res.data === 'string' ? setError(true) : setError(false)

			axiosAll(
				'GET',
				`/users/${loggedInUser.response._id}`,
				loggedInUser.token,
				dispatchUser
			)
		})
	}

	return (
		<div className='h-4/5 w-3/4 max-w-[800px] grid-centered main-bg mx-auto md:mt-28 min-w-[370px] min-h-[900px]'>
			{loggedInUser.response && (
				<>
					<div className='grid-centered'>
						<img
							className='h-[150px] w-[150px] rounded-full border-2 border-white'
							src={userData.profileimg || defaultImage}
							alt='profile-icon'
						/>
					</div>
					<form className='vertical text-white gap-y-2'>
						<label className=' mx-auto'>profile picture</label>
						<input
							className='profileimg w-[90%] input'
							type='profile-image'
							placeholder='paste a picture URL here'
							onChange={inputChange}
							value={userData.profileimg}
						/>
						<p className='border-b-[1px] border-white pb-1 text-white/70 text-center'>
							only JPG and PNG files supported.
						</p>
						<h3>{userData.username}</h3>
						<label className='mx-auto'>about me</label>
						<textarea
							rows='5'
							className='about w-[90%] input text-area p-2'
							as='textarea'
							type='about-me'
							placeholder='write your about me here for others to see'
							maxLength='500'
							onChange={inputChange}
							value={userData.about}
						/>
						<p className='border-b-[1px] border-white pb-1 text-white/70 text-center'>
							maximum length: 500 characters
						</p>
						<div className='grid-centered'>
							<label className=''>location</label>
							<input
								className='location input mb-2'
								type='location'
								placeholder='eg. los angeles, california'
								onChange={inputChange}
								value={userData.location}
							/>
							<label>display name</label>
							<input
								className='displayname input mb-2'
								type='display-name'
								placeholder='change display name'
								onChange={inputChange}
								value={userData.displayname}
							/>
							<p className='border-b-[1px] border-white pb-1 text-white/70 text-center'>
								this will be the name other users see when they view your profile.
							</p>
						</div>
						<div className='grid-centered'>
							<label>email</label>
							<input
								className='email input'
								type='email-address'
								placeholder='Change your email address'
								onChange={inputChange}
								value={userData.email}
							/>
							{error && <p>this email address already exists, please enter another</p>}
						</div>
						<button
							className='account-button w-1/2 mx-auto m-3'
							type='submit'
							id='save-changes'
							onClick={onSubmit}
						>
							save changes
						</button>
					</form>
				</>
			)}
		</div>
	)
}

export default UserProfile
