import React, {useContext, useEffect, useReducer, useState} from 'react'
import {Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'
import {Context} from '../../App'

const SignUp = () => {
	// State Hooks and Variables
	// ===========================================================================
	const initialState = {
		username: false,
		email: false,
		confirmPassword: false,
	}

	const {dispatchUser, loggedInUser} = useContext(Context)
	const [error, dispatchError] = useReducer(axiosReducer, initialState)
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
		dispatchError({
			key: 'initialize',
			value: initialState
		})

		if (loggedInUser.password === loggedInUser.confirmPassword) {
			// Prevent submit with missing username or password
			if(loggedInUser.username === '') {
				dispatchError({
					key: 'username',
					value: 'missing'
				})
			} else if(loggedInUser.email === '') {
				dispatchError({
					key: 'email',
					value: 'missing'
				})
			} else {
				// Process signup request
				const response = await axiosAll(
					'POST',
					`/users/signup`,
					null,
					dispatchUser,
					loggedInUser
				)
				// Check for error response
				if (typeof response.data === 'string') {

					dispatchError({
						key: 'username',
						value: response.data.indexOf('{ username:') !== -1 ? 'taken' : false,
					})
					dispatchError({
						key: 'email',
						value: response.data.indexOf('{ email:') !== -1 ? 'taken' : false,
					})
				} else {

					setSuccess(true)
					setShow(!show)
				}
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
	}, [])

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
								<button className='account-button w-full white-subheader base-text'>
									Set up your profile
								</button>
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
						
						<input
							className='username input account-input'
							type='text'
							placeholder='Username'
							onChange={changeHandler}
							value={loggedInUser.username}
						></input>
						{error.username && 
							<p className='account-error'>
								{error.username === 'taken' 
									? 'Username already exists'
									: 'Username is required'
								}
							</p>
						}
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
							<p className='account-error'>Passwords do not match</p>
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
								{error.email === 'taken' 
									? 'Email address already exists'
									: 'Email is required'
								}
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
