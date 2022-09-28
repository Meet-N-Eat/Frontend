import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../App'
import { Link } from 'react-router-dom'
import {Card, Button, Container, Image, Col, Row, ButtonGroup, ToggleButton} from 'react-bootstrap/'
import { axiosReducer, axiosAll } from '../data-and-functions/axiosAll';


const RestaurantCard = ({ restaurant }) => {
    const { colorTemplate, loggedInUser, dispatchUser }  = useContext(Context)
    const [buttonIcon, setButtonIcon] = useState('https://www.iconpacks.net/icons/1/free-heart-icon-492-thumb.png')
    const { name, image_url, display_phone, price } = restaurant
    const { city, state } = restaurant.location
    const categories = []
    restaurant.categories.forEach(category => categories.push(category.title))

    function likeHandler() {
        loggedInUser.response.likedrestaurants.find(restaurant._id) ?
        axiosAll('POST', `/users/${loggedInUser.response._id}/likedrestaurants/${restaurant._id}`, loggedInUser.token)
        && setButtonIcon('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png')
        : axiosAll('DELETE', `users/${loggedInUser.response._id}/likedrestaurants/${restaurant._id}`, loggedInUser.token)
    }

    useEffect()
    
    if (categories) {
        return (
            <Card style={{marginBottom:'5%', fontSize:'70%', display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', width:'100%', border:`1px solid ${colorTemplate.darkColor}`, margin:'1%', height:'100%'}} className="fluid">
                <div style={{width:'100%'}}>
                    <ButtonGroup style={{float:'right', margin:'1%'}}className="mb-2">
                        <Button type="checkbox" variant="outline-light">
                        <Image
                        width={50}
                        src={buttonIcon} 
                        onClick={likeHandler}
                        />
                        </Button>
                    </ButtonGroup>
                </div>
        <Card style={{border:'none', border:"none", padding:'5%', minWidth: '300px', minHeight: '400px'}} className="fluid">
            <Link style={{ color:'black', textDecoration:'none' }} to={`/restaurants/${restaurant._id}`}>
            <Card
            style={{ display:'flex', flexDirection:'column'}}
            className ="py-1 px-1 border-white ">
                <Row style={{padding:'5%', borderRadius:'10px', backgroundColor:"white"}}>
                    <Col >
                        <Container style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} className="ml-1">
                            <Image 
                                style={{ borderRadius:'10px', border:'1px solid #D6300F', marginBottom:'5%'}}
                                src={image_url}
                                alt="restaurant-image"
                                width={170}
                                height={170}
                                />
                            <Card.Title>{name}</Card.Title>
                        </Container> 
                    </Col>
                    <Col>
                        <Card.Body>
                            <p>{price}</p>
                            <p>M - F 9:00 AM - 8:00 PM</p>
                            <Row>
                                <Col>
                                    <p>{city}, {state}</p>
                                </Col>
                                <Col>
                                    <p>{display_phone}</p>
                                </Col>
                            </Row>
                            {categories.map(category => 
                                <Row>
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
    )
}}

export default RestaurantCard