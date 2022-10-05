import { useContext, useEffect, useState } from "react"
import { NavDropdown, Navbar, Container, Row } from "react-bootstrap"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Context } from "../../App"
import { HiMail, HiCog } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import { GrCircleInformation} from 'react-icons/gr'
import { FaUserFriends } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const NavBar = () => {
const { loggedInUser } = useContext(Context)
const [option, setOption] = useState('')
const navigate = useNavigate()

useEffect(() => {
    navigate(`/users/authentication/${option}`)
},[option])

function userAuthClick(e) {
    switch(e.target.text) {
        case 'Log In':
            setOption('login')
            break
        case 'Sign Up':
            setOption('signup')
            break
        default:
            break
    }
}

function handleLogOut(){
    loggedInUser.token = null;
 }

return (
    <Navbar expand='lg' >
        <Container style={{borderBottom: '1px solid black' }}>

                        <Link  to='/home'><Navbar.Brand  style={{border: '1px solid black', backgroundColor:'#EB3510', color: 'white', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1rem', paddingBottom: '0.7rem', float: 'left', marginLeft: '0px'}} className="nav-title">MEET 'N EAT</Navbar.Brand></Link>

                        {loggedInUser.token ?
                                <>
                                <NavLink to='/profile'>
                                    <CgProfile 
                                    style={{color:'#D6300F'}} 
                                    size={40}/>
                                </NavLink>
                                <NavLink 
                                to='/message-center' 
                                style={{color: '#EB3510'}}>
                                    <HiMail size={40}/>
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