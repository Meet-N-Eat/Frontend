import {useReducer, useContext, useEffect, useRef} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import {Context} from '../../App'
import {axiosAll} from '../../data-and-functions/axiosAll'

const LogIn = () => {
	// State Hooks and Variables
	// ===========================================================================
	const component = useRef({isMounted: false})
	const [login, dispatch] = useReducer(
		(state, object) => {
			switch (object.key) {
				case 'success':
					return {...state, success: object.value}

				case 'badLogin':
					return {...state, badLogin: object.value}

				default:
					return state
			}
		},
		{success: false, badLogin: false}
	)
	const {loggedInUser, dispatchUser} = useContext(Context)
	const navigate = useNavigate()
	const location = useLocation()
	// Functions
	// ===========================================================================
	function changeHandler(e) {
		dispatchUser({
			key: e.target.classList[0],
			value: e.target.value,
		})
	}

	async function submitHandler(e) {
		e.preventDefault()
		const response = await axiosAll('POST', `/users/signin`, null, dispatchUser, loggedInUser)

		response.data.token
			? dispatch({
					key: 'success',
					value: true,
			  })
			: dispatch({
					key: 'badLogin',
					value: true,
			  })

		dispatchUser({
			key: 'password',
			value: '',
		})
	}

	useEffect(() => {
		component.isMounted
			? axiosAll(
					'GET',
					`/users/username/${loggedInUser.username}`,
					loggedInUser.token,
					dispatchUser
			  ) && navigate('/')
			: (component.isMounted = true)
	}, [login.success])

	// Return
	// ===========================================================================
	return (
		<div className=''>
			<div className='start-container items-center bg-white opacity-90 w-60 md:w-80 p-4'>
				<h1 className='header text-2xl text-red-900 mx-auto pt-2'>LOG IN</h1>
				{location.state !== null && (
					<p className='text-center mx-auto text-xs md:text-sm'>
						Log in to access this feature!
					</p>
				)}
				<form onSubmit={submitHandler}>
					<input
						className='username input mt-4 account-input border border-slate-800'
						type='text'
						placeholder='Username'
						onChange={changeHandler}
						value={loggedInUser.username}
					></input>
					<input
						className='password input my-4 account-input border border-slate-800'
						type='password'
						placeholder='Password'
						onChange={changeHandler}
						value={loggedInUser.password}
					></input>
					{login.badLogin && (
						<h1 className='text-center mb-2 text-xs md:text-sm text-red-800'>
							Incorrect username or password
						</h1>
					)}
					<Row>
						<button className='account-button w-20 mb-4 mx-auto' type='submit'>
							Submit
						</button>
					</Row>
				</form>
				<Link
					className='mx-auto text-xs md:text-lg hover:text-red-900 hover:font-normal'
					to='/users/authentication/signup'
				>
					Not registered? Sign up here
				</Link>
			</div>
		</div>
	)
}

export default LogIn
