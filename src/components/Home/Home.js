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
		<div className='home h-36 w-10/12 mx-auto rounded-2xl flex flex-col justify-center space-y-2'>
			<p className='text-white text-3xl mx-auto'>Find restaurants you like? Meet others who like them too.</p>
			<Search />
			{!loggedInUser.token && (
				<>
					<button 
						className='row-start-4 bg-white rounded-full p-1 mx-auto'
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
