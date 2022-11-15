import React, {useContext, useEffect, useReducer, useState} from 'react'
import {Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {Context} from '../../App'

const SignUp = () => {
	// State Hooks and Variables
	// ===========================================================================
	const {dispatchUser, loggedInUser} = useContext(Context)
	const [error, dispatchError] = useReducer(axiosReducer, {username: false, email: false, confirmPassword: false})
	const [show, setShow] = useState(false)
	const [success, setSuccess] = useState(false)

	// Event Handlers and Functions
	// ===========================================================================
	function changeHandler(e) {
		dispatchUser({
			key: e.target.classList[0],
			value: e.target.value,
		})
	}

	async function submitHandler(e) {
		e.preventDefault()
		if (loggedInUser.password === loggedInUser.confirmPassword) {
			const response = await axiosAll('POST', `/users/signup`, null, dispatchUser, loggedInUser)
			if (typeof response.data === 'string') {
				response.data.indexOf('{ username:') !== -1
					? dispatchError({key: 'username', value: true})
					: dispatchError({key: 'username', value: false})
				response.data.indexOf('{ email:') !== -1
					? dispatchError({key: 'email', value: true})
					: dispatchError({key: 'email', value: false})
			} else if (!error.username && !error.email) {
				setSuccess(true)
				setShow(!show)
			}
		} else {
        dispatchError({key: 'confirmPassword', value: true})
    }
	}

	useEffect(() => {
		if (success) {
			axiosAll('POST', `/users/signin`, null, dispatchUser, loggedInUser)
		}
	}, [success])

	useEffect(() => {
		const userName = document.querySelector('.username')
		userName.focus()
	},[])

	// Return
	// ===========================================================================
	return (
		<div className=''>
			{success ? (
				<div className='start-container w-60 md:w-96 white-bg p-4 text-center flex-centered md:mt-24'>
					<h1 className='red-header py-2'>Successfully registered!</h1>
					<div className='py-2'>
						<div className='pb-3'>
							<Link to='/profile'>
								<button className='account-button w-full white-subheader'>Set up your profile</button>
							</Link>
						</div>
						<Link to='/'>
							<p className='text-xl hover:text-red-900 hover:font-normal'>Skip</p>
						</Link>
					</div>
				</div>
			) : (
				<div className='signup start-container items-center white-bg w-72 md:w-96 p-5 space-y-4'>
					<h1 className='red-header mx-auto pt-2'>SIGN UP</h1>
					<form className='space-y-4' action='' onSubmit={submitHandler}>
						{error.username && (
							<p className='account-error'>
								Username already exists
							</p>
						)}
						<input
							className='username input account-input'
							type='text'
							placeholder='Username'
							onChange={changeHandler}
							value={loggedInUser.username}
						></input>
						<input
							className='password input account-input'
							type='password'
							placeholder='Password'
							onChange={changeHandler}
							value={loggedInUser.password}
						></input>
						<input
							className='confirmPassword input account-input'
							type='password'
							placeholder='Confirm Password'
							onChange={changeHandler}
							value={loggedInUser.confirmPassword}
						></input>
            {error.confirmPassword && (
              <p className='account-error'>
              Passwords do not match
              </p>
            )}
						<input
							className='email input account-input'
							type='text'
							placeholder='Email'
							onChange={changeHandler}
							value={loggedInUser.email}
						></input>
            {error.email && (
							<p className='account-error'>
								Email address already exists
							</p>
						)}
						<Row>
							<button
								className='account-button w-20 mx-auto mb-2 base-text'
								type='submit'
							>
								Submit
							</button>
						</Row>
					</form>
				</div>
			)}
		</div>
	)
}

export default SignUp
