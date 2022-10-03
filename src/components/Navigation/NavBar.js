import { useContext, useEffect, useState } from "react"
import { NavDropdown, Navbar, Container } from "react-bootstrap"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { HiMail, HiCog } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import { Context } from "../../App"

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

return (
    <Navbar expand='lg' >
        <Container style={{borderBottom: '1px solid black' }}>

                        <Link  to='/home'><Navbar.Brand  style={{border: '1px solid black', backgroundColor:'#EB3510', color: 'white', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1rem', paddingBottom: '0.7rem', float: 'left', marginLeft: '0px'}} className="nav-title">MEET 'N EAT</Navbar.Brand></Link>

                        <Link to='/faq' style={{paddingLeft: '0px', color:'#EB3510', textDecoration:"none", fontWeight:'500', fontSize:'25px'}}>FAQ</Link>

                        <div></div>
                        <div></div>
                        <div></div>

                        <NavLink to='/message-center' style={{color: '#EB3510'}}><HiMail size={40}/></NavLink>

                        {loggedInUser.token ?

                            <NavLink to='/profile' style={{color: '#EB3510'}}><CgProfile size={40}/></NavLink>
                            : (

                                <NavDropdown className="nav-dropdown d-inline-block" title={<CgProfile style={{color:'#D6300F'}} size={40}/>}>
                                    {['Log In', 'Sign Up'].map((text, index) => <NavDropdown.Item onClick={userAuthClick} key={index}>{text}</NavDropdown.Item>)}
                                </NavDropdown> 
                            )
                        }

                        <Link to='/profile/settings' style={{color: '#EB3510'}}><HiCog size={40}/></Link>
        </Container>
        
    </Navbar>
)
}

export default NavBar