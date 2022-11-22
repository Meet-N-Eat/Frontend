import {useState, useEffect} from 'react'
import useAuth from '../../hooks/useAuth'
import { axiosAll } from '../../data-and-functions/axiosAll'
import { Modal } from 'react-bootstrap'
import Search from './Search'
import SignUp from '../LoginSignUp/SignUp'

const Home = () => {
	// State hooks and Variables
	// ===========================================================================
	const {loggedInUser, dispatchUser} = useAuth()
	const [show, setShow] = useState(false)

	// Event Handlers and Functions
	// ===========================================================================
	useEffect(()=> {
		loggedInUser.token
			? axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
			: axiosAll('GET', '/users/refresh', null, dispatchUser)		
	},[])

	function signUpShowHandler() {
		setShow(prevState => !prevState)
	}

	// Return
	// ===========================================================================
	return (
		<div className='main-bg start-container h-60 md:h-48 w-10/12 max-w-5xl space-y-5'>
			<p className='home-header w-10/12 max-w-3xl mx-auto'>Find restaurants you like? Meet others who like them too.</p>
			<Search />
			{!loggedInUser.token && (
				<>
					<button 
						className='button base-text row-start-4 mx-auto'
						onClick={signUpShowHandler}>
						Create account
					</button>
					<Modal 
					show={show} 
					onHide={() => setShow(false)}
					centered={true}>
						<SignUp />
					</Modal> 
				</>
			)}
		</div>
	)
}

export default Home
