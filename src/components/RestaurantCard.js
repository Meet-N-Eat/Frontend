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
    // const { name, image_url, display_phone, price } = restaurant
    // const { address1, city, state } = restaurant.location
    const categories = []
    resDetails.response && resDetails.response.categories.forEach(category => categories.push(category.title))

    useEffect(() => {
        axiosAll('GET', `/restaurants/${restaurant}`, null, dispatchDetails)
    },[])
    console.log(loggedInUser.response)
    // console.log(restaurant)
// Functions
// ===========================================================================
    function liked() {
        return true
        if(loggedInUser.response && loggedInUser.response.favorites.find(favorite => favorite === restaurant)) return true
        else return false
    }

    async function likeHandler() {
        if(loggedInUser.token) {
            // Add or delete based on whether restaurant is already a favorite
            const callArgs = liked() ? 
                ['DELETE', `/users/${loggedInUser.response._id}/favorites/${restaurant._id}`]
                : ['POST', `/users/${loggedInUser.response._id}/favorites/${restaurant._id}`] 
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
                <Card 
                    style={{
                        marginBottom:'5%', 
                        fontSize:'70%', 
                        display:'flex', 
                        flexWrap:'wrap', 
                        justifyContent:'center', 
                        alignItems:'center', 
                        width:'100%', 
                        border:`1px solid ${colorTemplate.darkColor}`, 
                        margin:'1%', height:'100%'
                    }} 
                    className="fluid"
                >
                    <div style={{width:'100%'}}>
                        {
                            // Hide like button if hideLikeButton is true
                            !hideLikeButton &&
                            <ButtonGroup style={{float:'right', margin:'1%'}}className="mb-2">
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
                    <Card style={{border:'none', padding:'5%', minWidth: '300px', minHeight: '400px'}} className="fluid">
                        <Link style={{ color:'black', textDecoration:'none' }} to={`/restaurants/${restaurant}`}>
                            <Card
                                style={{ display:'flex', flexDirection:'column'}}
                                className ="py-1 px-1 border-white "
                            >
                                <Row style={{padding:'5%', borderRadius:'10px', backgroundColor:"white"}}>
                                    <Col >
                                        <Container style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} className="ml-1">
                                            <Image 
                                                style={{ borderRadius:'10px', border:'1px solid #D6300F', marginBottom:'5%'}}
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
                                            <p>{resDetails.price}</p>
                                            <p>M - F 9:00 AM - 8:00 PM</p>
                                            <Row>
                                                <Col>
                                                    <p>{resDetails.response.address1}</p>
                                                    <p>{resDetails.response.city}, {resDetails.response.state}</p>
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