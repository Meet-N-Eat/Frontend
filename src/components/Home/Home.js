import {useContext, useState, useEffect} from 'react'
import {Context} from '../../App'
import Search from './Search'
import SignUp from '../LoginSignUp/SignUp'
import { Modal } from 'react-bootstrap'
import { axiosAll } from '../../data-and-functions/axiosAll'

const Home = () => {
	// State hooks and Variables
	// ===========================================================================
	const {loggedInUser, dispatchUser} = useContext(Context)
	const [show, setShow] = useState(false)

	// Getting user data
	// ===========================================================================
	useEffect(()=> {
		axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
	},[])

	// Event handlers
	// ===========================================================================
	function signUpShowHandler() {
		setShow(prevState => !prevState)
	}


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
