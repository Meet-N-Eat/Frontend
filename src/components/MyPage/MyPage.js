import { useContext, useEffect, useState, useRef } from 'react'
import Favorites from './Favorites'
import Friends from './Friends'
import CoordinateMeetup from './CoordinateMeetup'
import Itinerary from './Itinerary'
import { axiosAll } from '../../data-and-functions/axiosAll'
import { Context } from '../../App'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import './MyProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faUsers, faPeopleArrows, faCalendarDays, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'


const MyPage = () => {
// State Hooks and Variables
// ===========================================================================
const { loggedInUser, dispatchUser } = useContext(Context)

useEffect(() => {
    axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
},[])

// Stating slideItems as an array of components
const slideItems = [<CoordinateMeetup loggedInUser={loggedInUser} dispatchUser={dispatchUser} />, <Friends friends={loggedInUser.response.friends} />, <Favorites favorites={loggedInUser.response.favorites} />, <Itinerary profile={loggedInUser.response}/>]

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
    <div>
        {loggedInUser && loggedInUser.response ?
        <div>
            <div class="absolute inset-y-52 left-4">
                <button 
                id="left-btn"
                onClick={leftSlideHandler}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </div>
            <div className="grid place-items-center h-screen">
                {slide}
            </div>
            <div class="absolute inset-y-52 right-4">
                <button 
                id="right-btn"
                onClick={rightSlideHandler}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
        : null }
        <div>
            <Navbar fixed='bottom' id='mypage-bar'>
                    <Container>
                        <Nav.Link
                        type="coordinate-meetup"
                        onClick={() => tabHandler(0)}>
                            <Container id="mypage-tabs">
                                <Row>
                                    <FontAwesomeIcon icon={faPeopleArrows} />
                                </Row>
                                <Row>
                                    invite
                                </Row>
                            </Container>
                        </Nav.Link>
                        <Nav.Link 
                        type="friends"
                        onClick={() => tabHandler(1)}>
                            <Container>
                                <Row>
                                    <FontAwesomeIcon icon={faUsers} />
                                </Row>
                                <Row>
                                    friends
                                </Row>
                            </Container>
                        </Nav.Link>
                        <Nav.Link 
                        type="favorites"
                        onClick={() => tabHandler(2)}>
                            <Container>
                                <Row>
                                    <FontAwesomeIcon icon={faUtensils} />
                                </Row>
                                <Row>
                                    favorites
                                </Row>
                            </Container>
                        </Nav.Link>
                        <Nav.Link 
                        type="itinerary"
                        onClick={() => tabHandler(3)}>
                            <Container>
                                <Row>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </Row>
                                <Row>
                                    itinerary
                                </Row>
                            </Container>
                        </Nav.Link>
                    </Container>
            </Navbar>
        </div>
    </div>
)
}

export default MyPage
