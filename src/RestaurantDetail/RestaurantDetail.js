import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Container, Col, Row, Modal } from 'react-bootstrap'
import { Context } from '../App'
import RestaurantCard from '../SearchResults/RestaurantCard'
import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll'
import { reviewStars } from '../data-and-functions/reviewStars'
import UserLikes from './UserLikes'


const RestaurantDetail = () => {
    // State hooks and variable declarations
    // ===========================================================================
    const [resDetails, dispatch] = useReducer(axiosReducer, { response: null })
    const { colorTemplate, loggedInUser, dispatchUser } = useContext(Context)
    const { restaurantId } = useParams()
    const [modalShow, setModalShow] = useState(false)
    
    // Getting restaurant data by restaurantId
    // ===========================================================================
    useEffect(() => {
        // Get restaurant state
        axiosAll('GET', `/restaurants/${restaurantId}`, loggedInUser.token, dispatch)

        // Update user state
        axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser)
        }, [])
    // Event Handler
    async function handleShow() {
        setModalShow(!modalShow) 
    }
console.log(resDetails)
 // conditional rendering & once resDetails is rendered, address variable declaration   
if (resDetails.response) {
const address = `${resDetails.response.location.address1}, ${resDetails.response.location.city}, ${resDetails.response.location.state}` 
    
return (
    <Container>
    <Card style={{padding:'1%', borderColor:`${colorTemplate.darkColor}`, boxShadow:'-1px 3px 11px 0px rgba(0,0,0,0.75)'}}>
        <Row>
            <Col style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
                <RestaurantCard restaurant={resDetails.response} />
                <p>{address}</p>
            </Col>
        </Row>
        <Row>
            {resDetails.response.userLikes && resDetails.response.userLikes.map(user => <UserLikes key={user._id} user={user} />)}
        </Row>
        <Row>
            <Col>
                <Row>
                    <div style={{ display:'flex', justifyContent:'center', marginTop:'2%' }}>
                        <h4>reviews</h4>
                    </div>
                </Row>
                <Reviews restaurantId={resDetails.response._id} />
                <div style={{ display:'flex', justifyContent:'center', marginTop:'2%' }}>
                    <button 
                        style={{backgroundColor:'white', borderRadius:'10px', borderColor:`${colorTemplate.darkColor}`, color:`${colorTemplate.darkColor}`}}
                        type="submit"
                        onClick={handleShow}
                    >write a review
                    </button>
                    <Modal 
                        show={modalShow}
                        onHide={handleShow}
                        size="md"
                        aria-labelledby="likedrestaurants-modal"
                        centered
                    > 
                        <ReviewForm restaurantId={resDetails.response._id} handleShow={handleShow} />
                    </Modal>
                </div>
            </Col>
        </Row>
    </Card>
    </Container>
)
}}

export default RestaurantDetail