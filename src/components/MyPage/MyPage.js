import { useContext, useEffect } from 'react'
import Favorites from './Favorites'
import Friends from './Friends'
import CoordinateMeetup from '../CoordinateMeetup'
import Itinerary from './Itinerary'
import { axiosAll } from '../../data-and-functions/axiosAll'
import { Context } from '../../App'
import { Navbar, Nav, Container, Carousel, Row, Col } from 'react-bootstrap'
import './MyProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faUsers, faPeopleArrows, faCalendarDays } from '@fortawesome/free-solid-svg-icons'


const MyPage = () => {
const { loggedInUser, dispatchUser } = useContext(Context)

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
        <div class="grid place-items-center h-screen">
            <Carousel slide={false} wrap={false}>
                <Carousel.Item>
                    <div class="grid place-items-center h-screen">
                        <CoordinateMeetup profile={loggedInUser.response}/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div class="grid place-items-center h-screen">
                        <Friends friends={loggedInUser.response.friends} />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div class="grid place-items-center h-screen">
                        <Favorites favorites={loggedInUser.response.favorites} />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div class="grid place-items-center h-screen">
                        <Itinerary profile={loggedInUser.response}/>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    </div>



    // <Container className='page-container'>
    //     <Row>
    //         {/* <Col>
    //             <ProfileCard profile={loggedInUser.response}/>
    //         </Col> */}
    //         <Col xs={8}>
    //             <Row>
    //                 <Col className='friends-likes'>
    //                     <LikedRestaurants likedrestaurants={loggedInUser.response.likedrestaurants} />
    //                 </Col>
    //                 <Col className='friends-likes'>
    //                     <Friends friends={loggedInUser.response.friends} />
    //                 </Col>
    //             </Row>
    //             <Row>
    //                 <CoordinateMeetup profile={loggedInUser.response}/>
    //             </Row>
    //         </Col>
    //         <Col>
    //             <Itinerary profile={loggedInUser.response}/>
    //         </Col>
    //     </Row>
    // </Container>

    // <div style={{
    //     marginLeft:'15%',
    //     marginRight:'15%',
    //     marginTop: '1%',
    //     height:'85vh',
    //     display:'flex',
    //     flexDirection:'row'
    //     }}
    //     className='d-sm-flex d-md-flex d-lg-flex flex-sm-column flex-md-column flex-lg-row'>

    //     <div style={{
    //         border:'1px solid #D6300F',
    //         boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)',
    //         width:'30%',
    //         marginRight:'3%',
    //         display:'flex',
    //         justifyContent:'center',
    //         borderRadius:'10px'
    //         }}
    //         className='container-lg mx-auto me-lg-2 mb-sm-3 mb-lg-0'>

    //         <ProfileCard profile={loggedInUser.response}/>

    //     </div>

    //     <div style={{
    //         width:'45%',
    //         marginRight:'3%',
    //         display:'flex',
    //         flexWrap:'wrap',
    //         justifyContent:'space-between'
    //         }}
    //         className='d-ms-flex d-md-flex f-lg-flex justify-content-sm-between mx-sm-auto mx-md-auto me-lg-2'>

    //         <div style={{
    //             boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)',
    //             height:'68%',
    //             width:'49%',
    //             borderRadius:'10px',
    //             overflow:'scroll',
    //             overflowX:'hidden',
    //             border:'1px solid #D6300F'
    //             }}
    //             className=''>

    //             <LikedRestaurant likedrestaurants={loggedInUser.response.likedrestaurants} />
    //         </div>

    //         <div style={{
    //             boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)',
    //             height:'68%',
    //             width:'49%',
    //             borderRadius:'10px',
    //             overflowY:'scroll',
    //             border:'1px solid #D6300F',
    //             }}
    //             className='friends-block'>

    //             <Friends friends={loggedInUser.response.friends} />

    //         </div>
    //         <div style={{
    //             boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)',
    //             height:'30%',
    //             width:'100%',
    //             marginTop:'2%',
    //             borderRadius:'10px'}}
    //             className=''>

    //             <CoordinateMeetup profile={loggedInUser.response}/>

    //         </div>
    //     </div>
    //     <div style={{
    //         boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)',
    //         width:'25%',
    //         borderRadius:'10px',
    //         border:'1px solid #D6300F'}}
    //          className='mx-sm-auto mx-md-auto'>
    //           <Itinerary profile={loggedInUser.response}/>
    //     </div>
    // </div>
)
}

export default MyPage
