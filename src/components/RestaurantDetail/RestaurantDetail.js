import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Container, Col, Row, Modal, Spinner } from 'react-bootstrap'
import { Context } from '../../App'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import RestaurantCard from '../RestaurantCard'
import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import UserLike from './UserLike'


const RestaurantDetail = () => {
    // State hooks and variable declarations
    // ===========================================================================
    const [ resDetails, dispatchRestaurant ] = useReducer(axiosReducer, {})
    const [ userLikes, dispatchLikes ] = useReducer(axiosReducer, [])
    const { colorTemplate, loggedInUser, dispatchUser } = useContext(Context)
    const { restaurantId } = useParams()
    const [ modalShow, setModalShow ] = useState(false)
    
    // Getting restaurant data by restaurantId
    // ===========================================================================
    useEffect(() => {
        // Update user state
        loggedInUser.token && axiosAll('GET', `/users/${loggedInUser.response._id}`, loggedInUser.token, dispatchUser)
    }, [])
    
    useEffect(() => {
        // Get restaurant state
        axiosAll('GET', `/restaurants/${restaurantId}`, null, dispatchRestaurant)
        axiosAll('GET', `/restaurants/${restaurantId}/userLikes`, null, dispatchLikes)
        console.log('Get restaurant state')
    },[])

    // Event Handler
    function handleShow() {
        setModalShow(!modalShow) 
    }

    // conditional rendering & once resDetails is rendered, address variable declaration   
    // if (resDetails.response) {
    // const address = `${resDetails.response.location.address1}, ${resDetails.response.location.city}, ${resDetails.response.location.state}` 
    
    return (
            <Container>
            {resDetails.response && userLikes.response ?
                <Card style={{padding:'1%', borderColor:`${colorTemplate.darkColor}`, boxShadow:'-1px 3px 11px 0px rgba(0,0,0,0.75)'}}>
                    <Row>
                        <Col style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <RestaurantCard restaurant={resDetails.response._id} />
                            {/* <p>{address}</p> */}
                        </Col>
                    </Row>
                    <Row>
                        {loggedInUser.token ? 
                            userLikes.response.map(user => <UserLike key={user._id} user={user} />)
                            : <Link to='/users/authentication/login' state={{logInMessage: true}}>{userLikes.response.length} users like this restaurant</Link>
                        }
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <div style={{ display:'flex', justifyContent:'center', marginTop:'2%' }}>
                                    {loggedInUser.token ? 
                                        <h4>reviews</h4>
                                        : <Link to='/users/authentication/login' state={{logInMessage: true}} >reviews</Link>
                                    }
                                </div>
                            </Row>
                            {loggedInUser.token &&
                                <>
                                    <Reviews restaurantId={resDetails.response._id} modalShow={modalShow} />
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
                                </>
                            }
                        </Col>
                    </Row>
                </Card>
            : <Spinner animation="border" />
            }
            </Container>
    )
}

export default RestaurantDetail