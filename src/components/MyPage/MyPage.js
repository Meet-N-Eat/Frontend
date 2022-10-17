import { useContext, useEffect } from 'react'
import Favorites from './Favorites'
import Friends from './Friends'
import CoordinateMeetup from './CoordinateMeetup'
import Itinerary from './Itinerary'
import { axiosAll } from '../../data-and-functions/axiosAll'
import { Context } from '../../App'
import { Navbar, Nav, Container, Carousel, Row } from 'react-bootstrap'
import './MyProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faUsers, faPeopleArrows, faCalendarDays } from '@fortawesome/free-solid-svg-icons'


const MyPage = () => {
    // State Hooks and Variables
    // ===========================================================================
    const { loggedInUser, dispatchUser } = useContext(Context)
    useEffect(() => console.log('MyPage Rendered'))
    useEffect(() => {
        axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
    },[])

    if(!loggedInUser.response){
        return <Container>Loading...</Container>
    }

    return (
        <div>
            <div>
                <Navbar fixed='bottom' id='mypage-bar'>
                        <Container>
                            <Nav.Link id="mypage-tabs" data-bs-target aria-label="Slide 1">
                                <Container id="mypage-tabs">
                                    <Row>
                                        <FontAwesomeIcon icon={faPeopleArrows} />
                                    </Row>
                                    <Row>
                                        invite
                                    </Row>
                                </Container>
                            </Nav.Link>
                            <Nav.Link id="mypage-tabs" data-bs-target aria-label="Slide 2">
                                <Container>
                                    <Row>
                                        <FontAwesomeIcon icon={faUsers} />
                                    </Row>
                                    <Row>
                                        friends
                                    </Row>
                                </Container>
                            </Nav.Link>
                            <Nav.Link id="mypage-tabs" data-bs-target aria-label="Slide 3">
                                <Container>
                                    <Row>
                                        <FontAwesomeIcon icon={faUtensils} />
                                    </Row>
                                    <Row>
                                        favorites
                                    </Row>
                                </Container>
                            </Nav.Link>
                            <Nav.Link id="mypage-tabs" data-bs-target aria-label="Slide 4">
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
            <div className="grid place-items-center h-screen">
                <Carousel slide={false} wrap={false} interval={null}>
                    <Carousel.Item>
                        <div className="grid place-items-center h-screen">
                            <CoordinateMeetup loggedInUser={loggedInUser} dispatchUser={dispatchUser} />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="grid place-items-center h-screen">
                            <Friends friends={loggedInUser.response.friends} />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="grid place-items-center h-screen">
                            <Favorites favorites={loggedInUser.response.favorites} />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="grid place-items-center h-screen">
                            <Itinerary profile={loggedInUser.response}/>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default MyPage
