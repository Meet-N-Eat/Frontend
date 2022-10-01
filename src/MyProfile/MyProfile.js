import React, { useContext, useEffect, useReducer } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import './MyProfile.css'
import { Context } from '../App'
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll'
import LikedRestaurants from '../components/LikedRestaurants'
import Friends from '../components/Friends'
import CoordinateMeetup from './CoordinateMeetup'
import ProfileCard from '../ProfileCard'
import Itinerary from '../components/Itinerary'

const MyProfile = () => {
const { loggedInUser, dispatchUser } = useContext(Context)

useEffect(() => {
    axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
},[])


if(!loggedInUser.response){
    return <Container>Loading...</Container>
}

return (

    <Container className='page-container'>
        <Row>
            {/* <Col>
                <ProfileCard profile={loggedInUser.response}/>
            </Col> */}
            <Col xs={8}>
                <Row>
                    <Col className='friends-likes'>
                        <LikedRestaurants likedrestaurants={loggedInUser.response.likedrestaurants} />
                    </Col>
                    <Col className='friends-likes'>
                        <Friends friends={loggedInUser.response.friends} />
                    </Col>
                </Row>
                <Row>
                    <CoordinateMeetup profile={loggedInUser.response}/>
                </Row>
            </Col>
            <Col>
                <Itinerary profile={loggedInUser.response}/>
            </Col>
        </Row>
    </Container>
    
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

export default MyProfile