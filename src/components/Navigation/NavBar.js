import {useContext, useRef} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {NavLink, useNavigate} from 'react-router-dom'
import {Context} from '../../App'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserGroup, faCommentDots, faGear, faCircleInfo, faCircleUser} from '@fortawesome/free-solid-svg-icons'
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
		<div className='flex flex-row justify-between items-center p-3'>
			<div>
				<NavLink to='/'>
					<h2 className='text-4xl text-white'>
						MEET <span className='text-red-600'>N</span> EAT
					</h2>
				</NavLink>
			</div>
			<div className='flex flex-row space-x-4'>
				{loggedInUser.token && loggedInUser.response ? (
					<>
						<NavLink to='/my-page'>
							<img
								src={loggedInUser.response.profileimg || defaultImage}
								alt='profile-icon'
								className='icon border-2'
								id='nav-profile-icon'
							/>
						</NavLink>
						<NavLink to='/friendrequests'>
							<FontAwesomeIcon icon={faUserGroup} className='icon' />
						</NavLink>
						<NavLink to='/messages'>
							<FontAwesomeIcon icon={faCommentDots} className='icon' />
						</NavLink>
						<NavDropdown
							className='nav-dropdown d-inline-block'
							title={<FontAwesomeIcon icon={faGear} className='icon' />}
						>
							<div>
								<NavLink to='/profile'>My Profile</NavLink>
							</div>
							<div>
								<NavLink to='/' onClick={handleLogOut}>
									Log Out
								</NavLink>
							</div>
						</NavDropdown>
					</>
				) : (
					<NavDropdown
						className='nav-dropdown d-inline-block'
						title={<FontAwesomeIcon icon={faCircleUser} className='icon' />}
					>
						{['Log In', 'Sign Up'].map((text, index) => (
							<NavDropdown.Item onClick={userAuthClick} key={index}>
								{text}
							</NavDropdown.Item>
						))}
					</NavDropdown>
				)}
				<NavLink to='/faq'>
					<FontAwesomeIcon icon={faCircleInfo} className='icon' />
				</NavLink>
			</div>
		</div>
	)
}

export default NavBar
