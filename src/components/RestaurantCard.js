import React, { useContext, useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {Card, Button, Container, Image, Col, Row, ButtonGroup } from 'react-bootstrap/'
import { Context } from '../App'
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll';


const RestaurantCard = ({ restaurant, hideLikeButton }) => {
    // State Hooks and Variables
  // ===========================================================================

    const likedImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png'
    const notLikedImage = 'https://www.iconpacks.net/icons/1/free-heart-icon-492-thumb.png'
    const { colorTemplate, loggedInUser, dispatchUser }  = useContext(Context)
    const navigate = useNavigate()
    
    const [resDetails, dispatchDetails] = useReducer(axiosReducer, {})
    const [buttonIcon, setButtonIcon] = useState(liked() ? likedImage : notLikedImage)
    const categories = []
    resDetails.response && resDetails.response.categories.forEach(category => categories.push(category.title))

    useEffect(() => {
        axiosAll('GET', `/restaurants/${restaurant}`, null, dispatchDetails)
    },[restaurant])

// Functions
// ===========================================================================
    function liked() {
        if(loggedInUser.response && loggedInUser.response.favorites.find(favorite => favorite === restaurant)) return true
        else return false
    }

    async function likeHandler() {
        if(loggedInUser.token) {
            // Add or delete based on whether restaurant is already a favorite
            const callArgs = liked() ? 
                ['DELETE', `/users/${loggedInUser.response._id}/favorites/${restaurant}`]
                : ['POST', `/users/${loggedInUser.response._id}/favorites/${restaurant}`] 
            const [ method, path ] = callArgs

            await axiosAll(method, path, loggedInUser.token)
            await axiosAll('GET', `/users/${loggedInUser.response._id}`, loggedInUser.token, dispatchUser)
            
            setButtonIcon(liked() ? notLikedImage : likedImage)
        } else {
            navigate('/users/authentication/login', { state: { logInMessage: true }})
        }
    }
    
// Return 
// ===========================================================================
        
    return (
        <div>
            {resDetails.response &&
                <Card>
                    <div>
                        {
                            // Hide like button if hideLikeButton is true
                            !hideLikeButton &&
                            <ButtonGroup>
                                <Button type="checkbox" variant="outline-light">
                                <Image
                                    width={50}
                                    src={buttonIcon} 
                                    onClick={likeHandler}
                                />
                                </Button>
                            </ButtonGroup>
                        }
                    </div>
                    <Card>
                        <Link to={`/restaurants/${restaurant}`}>
                            <Card>
                                <Row>
                                    <Col >
                                        <Container>
                                            <Image 
                                                src={resDetails.response.image_url}
                                                alt="restaurant-image"
                                                width={170}
                                                height={170}
                                            />
                                            <Card.Title>{resDetails.response.name}</Card.Title>
                                        </Container> 
                                    </Col>
                                    <Col>
                                        <Card.Body>
                                            <p>{resDetails.response.price}</p>
                                            <p>M - F 9:00 AM - 8:00 PM</p>
                                            <Row>
                                                <Col>
                                                    <p>{resDetails.response.location.address1}</p>
                                                    <p>{resDetails.response.location.city}, {resDetails.response.location.state}</p>
                                                </Col>
                                                <Col>
                                                    <p>{resDetails.response.display_phone}</p>
                                                </Col>
                                            </Row>
                                            {categories.map((category, index) => 
                                                <Row key={index}>
                                                    {category}
                                                </Row>
                                            )}
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Link>
                    </Card>
                </Card>
            }
        </div>
    )
}

export default RestaurantCard