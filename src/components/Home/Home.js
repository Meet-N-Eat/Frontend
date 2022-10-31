import { useContext, useState } from 'react'
import { Context } from '../../App'
import Search from './Search'
import SignUp from '../LoginSignUp/SignUp'

const Home = () => {
    // State hooks and Variables
    // ===========================================================================
    const { loggedInUser } = useContext(Context)
    const [signUpShow, setSignUpShow] = useState(false)

    // Event handlers
    // ===========================================================================
    function signUpShowHandler() {
        setSignUpShow(true)
    }

    return (
        <div className='border border-black h-full'>
            { loggedInUser.token ? 
                    <Search />
                : 
                <>
                    <Search />
                    <div className='row-start-4'>
                        <button 
                            id="signup-button"
                            onClick={signUpShowHandler}
                        >
                            Create an account
                        </button>
                    </div>
                    { signUpShow ? <SignUp /> : null }
                </>
            }
        </div>
    )
}

export default Home