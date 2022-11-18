import {useContext, useEffect, useState, useRef} from 'react'
import {Link, Outlet} from 'react-router-dom'
import {axiosAll} from '../../data-and-functions/axiosAll'
import {Context} from '../../App'
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
	const [currentPage, setCurrentPage] = useState('invite')

	// Stating slideItems as an array of components
	const slideItems = [
		<CoordinateMeetup loggedInUser={loggedInUser} dispatchUser={dispatchUser} />,
		<Friends loggedInUser={loggedInUser} />,
		<Favorites loggedInUser={loggedInUser} />,
		<Itinerary loggedInUser={loggedInUser} />,
	]

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

	// Event Handlers and Functions
	// ===========================================================================

	useEffect(() => {
		axiosAll('GET', `/users/${loggedInUser.response._id}`, loggedInUser.token, dispatchUser)
	}, [])

	function slideHandler(direction) {
		direction === 'right'
			? slideIndex.current < 3 && slideIndex.current++
			: slideIndex.current > 0 && slideIndex.current--

		setSlide(slideItems[slideIndex.current])
	}

	function tabHandler(tabIndex) {
		slideIndex.current = tabIndex
		setSlide(slideItems[slideIndex.current])
	}

	function generateTabs() {
		const tabArray = []
		for (const key in navTabs) {
			tabArray.push(
				<li
					className={
						'h-20 w-32 bg-red-800/90 shadow-2xl shadow-slate-800 text-white border-r border-black rounded-t-2xl grid items-center' +
						(navTabs[key].title === currentPage 
							? ' bg-white' 
							: ' hover:bg-white')
					}
					key={key}
				>
					<Link
						to={navTabs[key].title}
						className={
							(navTabs[key].title === currentPage && ' text-red-800/90')
							+ ' text-center no-underline hover:text-red-800/90'
						}
						onClick={() => setCurrentPage(navTabs[key].title)}
					>
						<div>
							<FontAwesomeIcon icon={navTabs[key].icon} />
						</div>
						<div>{navTabs[key].title}</div>
					</Link>
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
					<Outlet />
					{slideIndex.current != 0 && (
						<button id='left-btn' onClick={() => slideHandler('left')}>
							<div className='arrow left'></div>
						</button>
					)}
					{slideIndex.current != 3 && (
						<button id='right-btn' onClick={() => slideHandler('right')}>
							<div className='arrow right'></div>
						</button>
					)}
				</div>
			)}
			<ul className='w-full h-12 flex-centered fixed left-0 bottom-0'>{generateTabs()}</ul>
		</div>
	)
}

export default MyPage
