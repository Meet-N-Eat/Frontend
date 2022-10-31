import { useContext, useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom'
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
                <div>
                    <div>
                        {
                            // Hide like button if hideLikeButton is true
                            !hideLikeButton &&
                            <div>
                                <button type="checkbox" variant="outline-light">
                                <img width={50} src={buttonIcon} onClick={likeHandler}/>
                                </button>
                            </div>
                        }
                    </div>
                    <div>
                        <Link to={`/restaurants/${restaurant}`}>
                            <div>
                                <div>
                                    <div >
                                        <div>
                                            <img 
                                                src={resDetails.response.image_url}
                                                alt="restaurant-image"
                                                width={170}
                                                height={170}
                                            />
                                            <h1>{resDetails.response.name}</h1>
                                        </div> 
                                    </div>
                                    <div>
                                        <div>
                                            <p>{resDetails.response.price}</p>
                                            <p>M - F 9:00 AM - 8:00 PM</p>
                                            <div>
                                                <div>
                                                    <p>{resDetails.response.location.address1}</p>
                                                    <p>{resDetails.response.location.city}, {resDetails.response.location.state}</p>
                                                </div>
                                                <div>
                                                    <p>{resDetails.response.display_phone}</p>
                                                </div>
                                            </div>
                                            {categories.map((category, index) => 
                                                <div key={index}>
                                                    {category}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default RestaurantCard