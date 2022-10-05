import { useContext, useEffect, useRef, useState } from "react"
import { NavDropdown, Navbar, Container, Row } from "react-bootstrap"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Context } from "../../App"
import { HiCog } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import { GrCircleInformation} from 'react-icons/gr'
import { AiOutlineMessage } from 'react-icons/ai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'



const NavBar = () => {

// State hooks and Variables
// ===========================================================================
const { loggedInUser, dispatchUser } = useContext(Context)
let option = useRef('')
const navigate = useNavigate()

function userAuthClick(e) {
    switch(e.target.text) {
        case 'Log In':
            option = 'login'
            break
        case 'Sign Up':
            option = 'signup'
            break
        default:
            break
    }
    navigate(`/users/authentication/${option}`)
}

// Event handlers
// ===========================================================================
function handleLogOut(){
    dispatchUser({
        key: 'logout'
    })
}



return (
    <Navbar expand='lg' >
        <Container style={{borderBottom: '1px solid black' }}>

                        <Navbar.Brand as={Link} to='/home'>
                            <h2>MEET N EAT</h2>
                        </Navbar.Brand>

                        {loggedInUser.token && loggedInUser.response ?
                                <>
                                <NavLink to='/profile'>
                                    <img 
                                    src={loggedInUser.response.profileimg} 
                                    alt="profile-icon"
                                    className="rounded-full h-10 w-10"
                                    id="nav-profile-icon"
                                     />
                                </NavLink>
                                <NavLink to='/friendrequests'>
                                    <FontAwesomeIcon icon={faUserGroup} />
                                </NavLink>
                                <NavLink to='/message-center'>
                                    <AiOutlineMessage size={40}/>
                                    </NavLink>
                                <NavDropdown 
                                className="nav-dropdown d-inline-block" 
                                title={<HiCog size={40}/>}>
                                    <Row>
                                        <NavLink to='/profile/settings'>
                                            Settings
                                        </NavLink>
                                    </Row>
                                    <Row>
                                        <NavLink 
                                        to='/home' 
                                        onClick={handleLogOut}>
                                            Log Out
                                        </NavLink>
                                    </Row>
                                </NavDropdown>
                                 <NavLink to='/faq'>
                                    <GrCircleInformation size={40}/>
                                </NavLink>
                                 </>
                            : (
                                <>
                                <NavDropdown className="nav-dropdown d-inline-block" title={<CgProfile style={{color:'#D6300F'}} size={40}/>}>
                                    {['Log In', 'Sign Up'].map((text, index) => <NavDropdown.Item onClick={userAuthClick} key={index}>{text}</NavDropdown.Item>)}
                                </NavDropdown>
                                <NavLink to='/faq'><GrCircleInformation size={40} /></NavLink>
                                </>
                            )
                            
                        } 
        </Container>
        
    </Navbar>
)
}

export default NavBar