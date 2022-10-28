import { InputGroup, Form } from 'react-bootstrap'
import { useState, useReducer, useEffect } from 'react'
import RestaurantCard from '../RestaurantCard';
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';

const Favorites = ({ loggedInUser }) => {

    const [searchCharacters, setSearchCharacters] = useState('')
    const [favorites, dispatchFavorites] = useReducer(axiosReducer, {})

    useEffect(() => {
        axiosAll('GET', `/users/${loggedInUser.response._id}/favorites`, loggedInUser.token, dispatchFavorites)
    }, [])

    return (
        <div className='likedRestaurants' style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
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
                {favorites.response && favorites.response.length > 0 ?
                    favorites.response.filter(restaurant => searchCharacters == '' || restaurant.name.toLowerCase().includes(searchCharacters.toLocaleLowerCase()))
                        .map(restaurant => <RestaurantCard key={restaurant._id} restaurant={restaurant._id}/>)
                    : <div>add favorites by clicking on the heart icon of a restaurant</div>
                }
            </div>
        </div>
    )
}

export default Favorites