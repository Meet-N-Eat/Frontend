import {useContext, useRef} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {NavLink, useNavigate} from 'react-router-dom'
import {Context} from '../../App'
import {HiCog} from 'react-icons/hi'
import {CgProfile} from 'react-icons/cg'
import {GrCircleInformation} from 'react-icons/gr'
import {AiOutlineMessage} from 'react-icons/ai'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserGroup} from '@fortawesome/free-solid-svg-icons'
import defaultImage from '../../assets/defaultImage.png'

const NavBar = () => {
	// State hooks and Variables
	// ===========================================================================
	const {loggedInUser, dispatchUser} = useContext(Context)
	let option = useRef('')
	const navigate = useNavigate()

	// Event handlers
	// ===========================================================================
	function userAuthClick(e) {
		switch (e.target.text) {
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

	function handleLogOut() {
		dispatchUser({
			key: 'initialize',
			value: {username: '', password: ''},
		})
	}

	return (
		<div className="flex flex-row justify-between items-center p-3">
			<div>
				<NavLink to='/'>
					<h2 className='text-4xl'>MEET N EAT</h2>
				</NavLink>
			</div>
			<div className='flex flex-row space-x-4'>
				{loggedInUser.token && loggedInUser.response ? (
					<>
						<NavLink to='/my-page'>
							<img
								src={loggedInUser.response.profileimg || defaultImage}
								alt='profile-icon'
								className='icon'
								id='nav-profile-icon'
							/>
						</NavLink>
						<NavLink to='/friendrequests'>
							<FontAwesomeIcon icon={faUserGroup} className='icon' />
						</NavLink>
						<NavLink to='/messages'>
							<AiOutlineMessage size={40} className='icon' />
						</NavLink>
						<NavDropdown className='nav-dropdown d-inline-block' title={<HiCog size={40} className='icon' />}>
							<div>
								<NavLink to='/profile'>My Profile</NavLink>
							</div>
							<div>
								<NavLink to='/' onClick={handleLogOut}>
									Log Out
								</NavLink>
							</div>
						</NavDropdown>
						<NavLink to='/faq'>
							<GrCircleInformation size={40} className='icon' />
						</NavLink>
					</>
				) : (
					<>
						<NavDropdown className='nav-dropdown d-inline-block' title={<CgProfile className='icon' />}>
							{['Log In', 'Sign Up'].map((text, index) => (
								<NavDropdown.Item onClick={userAuthClick} key={index}>
									{text}
								</NavDropdown.Item>
							))}
						</NavDropdown>
						<NavLink to='/faq'>
							<GrCircleInformation size={40} className='icon' />
						</NavLink>
					</>
				)}
			</div>
		</div>
	)
}

export default NavBar
