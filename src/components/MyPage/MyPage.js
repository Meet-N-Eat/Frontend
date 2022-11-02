import {useContext, useEffect, useState, useRef} from 'react'
import Favorites from './Favorites'
import Friends from './Friends'
import CoordinateMeetup from './CoordinateMeetup'
import Itinerary from './Itinerary'
import {axiosAll} from '../../data-and-functions/axiosAll'
import {Context} from '../../App'
import {Navbar, Nav} from 'react-bootstrap'
import './MyProfile.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
	faUtensils,
	faUsers,
	faPeopleArrows,
	faCalendarDays,
	faChevronRight,
	faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

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

	// Building state for slideItems
	const [slide, setSlide] = useState(slideItems[0])

	// Functions
	// ===========================================================================

	function rightSlideHandler() {
		if (slideIndex.current < 3) {
			slideIndex.current++
		}
		setSlide(slideItems[slideIndex.current])
	}

	function leftSlideHandler() {
		if (slideIndex.current > 0) {
			slideIndex.current--
		}
		setSlide(slideItems[slideIndex.current])
	}

	function tabHandler(tabIndex) {
		slideIndex.current = tabIndex
		setSlide(slideItems[slideIndex.current])
	}

	return (
		<div className='centered row-start-2'>
			{loggedInUser && loggedInUser.response && (
				<div>
					{slideIndex.current !== 0 && (
						<div>
							<button id='left-btn' onClick={leftSlideHandler}>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
						</div>
					)}
					<div className=''>
						{slide}
					</div>
					{slideIndex.current !== 3 && (
						<div>
							<button id='right-btn' onClick={rightSlideHandler}>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
					)}
				</div>
			)}
			<div>
				<Navbar fixed='bottom' id='mypage-bar'>
					<div>
						<Nav.Link type='coordinate-meetup' onClick={() => tabHandler(0)}>
							<div id='mypage-tabs'>
								<div>
									<FontAwesomeIcon icon={faPeopleArrows} />
								</div>
								<div>invite</div>
							</div>
						</Nav.Link>
						<Nav.Link type='friends' onClick={() => tabHandler(1)}>
							<div>
								<div>
									<FontAwesomeIcon icon={faUsers} />
								</div>
								<div>friends</div>
							</div>
						</Nav.Link>
						<Nav.Link type='favorites' onClick={() => tabHandler(2)}>
							<div>
								<div>
									<FontAwesomeIcon icon={faUtensils} />
								</div>
								<div>favorites</div>
							</div>
						</Nav.Link>
						<Nav.Link type='itinerary' onClick={() => tabHandler(3)}>
							<div>
								<div>
									<FontAwesomeIcon icon={faCalendarDays} />
								</div>
								<div>itinerary</div>
							</div>
						</Nav.Link>
					</div>
				</Navbar>
			</div>
		</div>
	)
}

export default MyPage
