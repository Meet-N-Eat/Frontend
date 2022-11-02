import {useContext, useState} from 'react'
import {Context} from '../../App'
import Search from './Search'
import SignUp from '../LoginSignUp/SignUp'

const Home = () => {
	// State hooks and Variables
	// ===========================================================================
	const {loggedInUser} = useContext(Context)
	const [signUpShow, setSignUpShow] = useState(false)

	// Event handlers
	// ===========================================================================
	function signUpShowHandler() {
		setSignUpShow(true)
	}

	return (
		<div className='bg-red h-56 md:h-48 w-10/12 max-w-5xl mx-auto rounded-2xl row-start-2 flex flex-col justify-center space-y-5'>
			<p className='text-white text-3xl w-10/12 max-w-3xl mx-auto'>Find restaurants you like? Meet others who like them too.</p>
			<Search />
			{!loggedInUser.token && (
				<>
					<button 
						className='button row-start-4 mx-auto'
						onClick={signUpShowHandler}>
						Create an account
					</button>
					{signUpShow ? <SignUp /> : null}
				</>
			)}
		</div>
	)
}

export default Home
