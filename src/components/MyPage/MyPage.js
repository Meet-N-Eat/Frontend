import {useContext, useEffect, useState, useRef} from 'react'
import {axiosAll} from '../../data-and-functions/axiosAll'
import {Context} from '../../App'
// import './MyProfile.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
	faUtensils,
	faUsers,
	faPeopleArrows,
	faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import Favorites from './Favorites'
import Friends from './Friends'
import CoordinateMeetup from './CoordinateMeetup'
import Itinerary from './Itinerary'

const MyPage = () => {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser, dispatchUser} = useContext(Context)

	useEffect(() => {
		axiosAll('GET', `/users/${loggedInUser.response._id}`, loggedInUser.token, dispatchUser)
	}, [])

	// Stating slideItems as an array of components
	const slideItems = [
		<CoordinateMeetup loggedInUser={loggedInUser} dispatchUser={dispatchUser} />,
		<Friends loggedInUser={loggedInUser} />,
		<Favorites loggedInUser={loggedInUser} />,
		<Itinerary loggedInUser={loggedInUser} />,
	]

	// slideIndex ref for event handlers
	const slideIndex = useRef(0)

	// Set first slide as initial state
	const [slide, setSlide] = useState(slideItems[0])

	// State for navigation tabs
	const navTabs = {
		0: {
			title: 'invite',
			icon: faPeopleArrows,
		},
		1: {
			title: 'friends',
			icon: faUsers,
		},
		2: {
			title: 'favorites',
			icon: faUtensils,
		},
		3: {
			title: 'itinerary',
			icon: faCalendarDays,
		},
	}

	// Functions and Event Handlers
	// ===========================================================================

	function slideHandler(direction) {
		direction === 'right' ? (
			slideIndex.current < 3 && slideIndex.current++
		) : (
			slideIndex.current > 0 && slideIndex.current--
		)
		
		setSlide(slideItems[slideIndex.current])
	}

	function tabHandler(tabIndex) {
		slideIndex.current = tabIndex
		setSlide(slideItems[slideIndex.current])
	}

	function generateTabs() {
		const tabArray = []
		for (const key in navTabs) {
			tabArray.push (
				<li
					className='h-20 w-32 bg-red-700 text-white border-r border-black rounded-t-2xl grid items-center'
					key={key} 
					onClick={() => tabHandler(key)}>
					<div className='text-center'>
						<div>
							<FontAwesomeIcon icon={navTabs[key].icon} />
						</div>
						<div>{navTabs[key].title}</div>
					</div>
				</li>
			)
		}
		return tabArray
	}

	// Return
	// ===========================================================================
	return (
		<div className='grid-centered'>
			{loggedInUser && loggedInUser.response && (
				<div className='h-full w-full max-w-[1200px] relative flex justify-center items-center'>
					{slide}
					{slideIndex.current !== 0 && (
						<button id='left-btn' onClick={() => slideHandler('left')}>
							<div className='arrow left hidden sm:block'></div>
						</button>
					)}
					{slideIndex.current !== 3 && (
						<button id='right-btn' onClick={() => slideHandler('right')}>
							<div className='arrow right hidden sm:block'></div>
						</button>
					)}
				</div>
			)}
			<ul className='w-full h-12 flex justify-center items-center fixed left-0 bottom-0'>
				{generateTabs()}
			</ul>
		</div>
	)
}

export default MyPage
