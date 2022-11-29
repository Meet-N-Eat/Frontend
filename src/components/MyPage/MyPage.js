import {useEffect, useState, useRef} from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import {axiosAll} from '../../data-and-functions/axiosAll'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
	faUtensils,
	faUsers,
	faPeopleArrows,
	faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'

const MyPage = () => {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser, dispatchUser} = useAuth()
	const [currentPage, setCurrentPage] = useState('invite')
	const navigate = useNavigate()
	const pageIndex = useRef(0)

	// State for navigation tabs
	const pages = {
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
		axiosAll(
			'GET', 
			`/users/id/${loggedInUser.response._id}`, 
			loggedInUser.token, 
			dispatchUser
		)
	}, [])

	function slideHandler(direction) {
		direction === 'right'
			? pageIndex.current < 3 && pageIndex.current++
			: pageIndex.current > 0 && pageIndex.current--

		navigate(pages[pageIndex.current].title)
		setCurrentPage(pages[pageIndex.current].title)
	}

	function generateTabs() {
		const tabArray = []
		for (const key in pages) {
			tabArray.push(
				<li
					className={
						'h-20 w-32 bg-red-800/90 shadow-2xl shadow-slate-800 text-white border-r border-black rounded-t-2xl grid items-center' +
						(pages[key].title === currentPage ? ' bg-white' : ' hover:bg-white')
					}
					key={key}
				>
					<Link
						to={pages[key].title}
						className={
							(pages[key].title === currentPage && ' text-red-800/90') +
							' text-center no-underline hover:text-red-800/90'
						}
						onClick={() => {
							setCurrentPage(pages[key].title)
							pageIndex.current = key
						}}
					>
						<div>
							<FontAwesomeIcon icon={pages[key].icon} />
						</div>
						<div>{pages[key].title}</div>
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
					{pageIndex.current !== 0 && (
						<button id='left-btn' onClick={() => slideHandler('left')}>
							<div className='arrow left'></div>
						</button>
					)}
					{pageIndex.current !== 3 && (
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
