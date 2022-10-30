import React, { useContext, useState } from 'react'
import { Context } from '../../App'
import { Row } from 'react-bootstrap'
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
        <div>
            { loggedInUser.token ? 
            <div id="loggedin-user-home">
                <Row>
                    <Search />
                </Row>
            </div>
            : 
            <div>
                <div id="new-user-home">
                    <Row>
                        <Search />
                    </Row>
                    <Row>
                        <button 
                        id="signup-button"
                        onClick={signUpShowHandler}
                        >
                            Create an account
                        </button>
                    </Row>
                </div>
                { signUpShow ? <SignUp /> : null }
            </div>
            }
        </div>
    )
}

export default Home