import {useContext, useRef, useState} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {NavLink, useNavigate} from 'react-router-dom'
import {Context} from '../../App'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
	faUserGroup,
	faCommentDots,
	faGear,
	faCircleInfo,
	faCircleUser,
	faBars,
	faX,
} from '@fortawesome/free-solid-svg-icons'
import defaultImage from '../../assets/defaultImage.png'

const NavBar = () => {
	// State hooks and Variables
	// ===========================================================================
	const {loggedInUser, dispatchUser} = useContext(Context)
	let option = useRef('')
	const navigate = useNavigate()
	const [toggle, setToggle] = useState(false)

	// Functions and Event handlers
	// ===========================================================================
	function userAuthClick(e) {
		switch (e.target.text) {
			case 'Log in':
				option = 'login'
				break
			case 'Sign up':
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

	function toggleMenu() {
		setToggle(prevState => !prevState)
	}

	// Return
	// ===========================================================================
	return (
		<div className='horizontal justify-between items-center p-3'>
			<div>
				<NavLink to='/'>
					<h2 className='nav-title'>
						MEET <span className='nav-N'>N</span> EAT
					</h2>
				</NavLink>
			</div>
			<div className='hidden space-x-4 sm:flex'>
				{loggedInUser.token && loggedInUser.response ? (
					<>
						<NavLink to='/my-page'>
							<img
								src={loggedInUser.response.profileimg || defaultImage}
								alt='profile-icon'
								className='icon border-2 hover-nav'
								id='nav-profile-icon'
							/>
						</NavLink>
						<NavLink to='/friendrequests'>
							<FontAwesomeIcon icon={faUserGroup} className='icon hover-nav' />
						</NavLink>
						<NavLink to='/messages'>
							<FontAwesomeIcon icon={faCommentDots} className='icon hover-nav' />
						</NavLink>
						<NavDropdown
							className='nav-dropdown d-inline-block'
							title={<FontAwesomeIcon icon={faGear} className='icon hover-nav' />}
						>
							<div>
								<NavLink className='hover-nav' to='/profile'>
									My Profile
								</NavLink>
							</div>
							<div>
								<NavLink className='hover-nav' to='/' onClick={handleLogOut}>
									Log Out
								</NavLink>
							</div>
						</NavDropdown>
					</>
				) : (
					<NavDropdown
						className='nav-dropdown d-inline-block'
						title={<FontAwesomeIcon icon={faCircleUser} className='icon hover-nav' />}
					>
						{['Log in', 'Sign up'].map((text, index) => (
							<NavDropdown.Item
								className='hover-nav'
								onClick={userAuthClick}
								key={index}
							>
								{text}
							</NavDropdown.Item>
						))}
					</NavDropdown>
				)}
				<NavLink to='/about'>
					<FontAwesomeIcon icon={faCircleInfo} className='icon hover-nav' />
				</NavLink>
			</div>
			<div className='space-x-4 sm:hidden' onClick={toggleMenu}>
				<FontAwesomeIcon className='text-white text-3xl' icon={faBars} />
			</div>
			{toggle && (
				<div className='menu text-white sm:hidden'>
					<FontAwesomeIcon
						icon={faX}
						className='absolute top-4 right-4'
						onClick={toggleMenu}
					/>
					<ul className='text-2xl space-y-4'>
						{loggedInUser.token && loggedInUser.response ? (
							<>
								<li onClick={toggleMenu}>
									<NavLink to='/my-page' className='hover-nav-small'>
										My Page
									</NavLink>
								</li>
								<li onClick={toggleMenu}>
									<NavLink to='/friendrequests' className='hover-nav-small'>
										Friend Requests
									</NavLink>
								</li>
								<li onClick={toggleMenu}>
									<NavLink to='/messages' className='hover-nav-small'>
										Messages
									</NavLink>
								</li>
								<li onClick={toggleMenu}>
									<NavLink to='/profile' className='hover-nav-small'>
										Edit Profile
									</NavLink>
								</li>
								<li onClick={toggleMenu}>
									<NavLink to='/' className='hover-nav-small' onClick={handleLogOut}>
										Log Out
									</NavLink>
								</li>
							</>
						) : (
							<>
								<li onClick={toggleMenu}>
									<NavLink
										to='/users/authentication/login'
										className='hover-nav-small'
									>
										Log In
									</NavLink>
								</li>
								<li onClick={toggleMenu}>
									<NavLink
										to='/users/authentication/signup'
										className='hover-nav-small'
									>
										Sign Up
									</NavLink>
								</li>
							</>
						)}
						<li onClick={toggleMenu}>
							<NavLink to='/about' className='hover-nav-small'>
								About
							</NavLink>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}
export default NavBar
