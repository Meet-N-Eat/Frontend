import React, { useContext, useState } from 'react'
import { Context } from '../../App'
import { Row } from 'react-bootstrap'
import Search from './Search'
import CuisineCategory from './CuisineCategory'
import SignUp from '../LoginSignUp/SignUp'


const Home = () => {
// State hooks and Variables
// ===========================================================================
const categories = ['Italian', 'Southern', 'American (Traditional)']
const { loggedInUser } = useContext(Context)
const [signUpShow, setSignUpShow] = useState(false)

// Event handlers
// ===========================================================================
function signUpShowHandler () {
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
    

    // <Container style={{height:'90vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    //     <Row>
    //         <Search />
    //     </Row>
    //     <h2 style={{paddingTop:'10%', marginBottom:'5%'}}>not sure where to go? start with a cuisine and see where it leads!</h2>
    //     <Row className="d-flex">
    //         {categories.map((category, index) => <CuisineCategory key={index} category={category} />)}
    //     </Row>
    // </Container>
)
}

export default Home