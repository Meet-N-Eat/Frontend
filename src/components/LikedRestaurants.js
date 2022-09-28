import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import { useState } from 'react'
import RestaurantCard from './RestaurantCard';

const LikedRestaurant = ( {likedrestaurants} ) => {

    const [searchCharacters, setSearchCharacters] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
        <InputGroup style={{ margin:'6%', width:'90%', marginTop:'10%'}} className="mb-3">
        <InputGroup.Text style={{backgroundColor:'#D6300F', color:'white'}} id="basic-addon2">enter name</InputGroup.Text>
            <Form.Control style={{border:'1px solid #D6300F'}} onChange={e => {
                    setSearchCharacters(e.target.value
                        )}
                    } placeholder="liked restaurants" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        </InputGroup>
        <div 
            style={{ padding:'5%', overflow:'scroll', overflowX:'hidden', maxHeight:'76%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:"center" }}
        >
            {likedrestaurants && likedrestaurants.filter((restaurant) => {
            if (searchCharacters == ''){
                return restaurant
            } else if (restaurant.name.toLowerCase().includes(searchCharacters.toLocaleLowerCase())) {
                return restaurant
            }   
        }).map(restaurant => <RestaurantCard key={restaurant._id} restaurant={restaurant}/> )}
        </div>
    </div>
)
}

export default LikedRestaurant