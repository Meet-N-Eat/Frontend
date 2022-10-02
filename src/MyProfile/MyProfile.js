import { useContext, useEffect, useReducer } from 'react'
import LikedRestaurant from './LikedRestaurants'
import Friends from './Friends'
import CoordinateMeetup from './CoordinateMeetup'
import ProfileCard from '../ProfileCard'
import Itinerary from './Itinerary'
import { Container } from 'react-bootstrap'
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll'
import { Context } from '../App'

const MyProfile = () => {
const [profile, dispatch] = useReducer(axiosReducer, { response: null })
const { loggedInUser } = useContext(Context)

useEffect(() => {
    axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatch)
},[])


if(!profile.response){
    return <Container>Loading...</Container>
}

return (
    
    <div style={{
        marginLeft:'15%',
        marginRight:'15%',
        marginTop: '1%',
        height:'85vh',
        display:'flex',
        flexDirection:'row' 
        }} 
        className='d-sm-flex d-md-flex d-lg-flex flex-sm-column flex-md-column flex-lg-row'>

        <div style={{ 
            border:'1px solid #D6300F', 
            boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)', 
            width:'30%', 
            marginRight:'3%', 
            display:'flex',     
            justifyContent:'center', 
            borderRadius:'10px' 
            }} 
            className='container-lg mx-auto me-lg-2 mb-sm-3 mb-lg-0'>

            <ProfileCard profile={profile.response}/>
            
        </div>

        <div style={{
            width:'45%', 
            marginRight:'3%', 
            display:'flex', 
            flexWrap:'wrap', 
            justifyContent:'space-between'
            }} 
            className='d-ms-flex d-md-flex f-lg-flex justify-content-sm-between mx-sm-auto mx-md-auto me-lg-2'>

            <div style={{
                boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)', 
                height:'68%', 
                width:'49%', 
                borderRadius:'10px',
                overflow:'scroll', 
                overflowX:'hidden', 
                border:'1px solid #D6300F'
                }} 
                className=''>

                <LikedRestaurant likedrestaurants={profile.response.likedrestaurants} />
            </div>

            <div style={{ 
                boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)', 
                height:'68%', 
                width:'49%', 
                borderRadius:'10px', 
                overflowY:'scroll', 
                border:'1px solid #D6300F',
                }} 
                className='friends-block'>

                <Friends friends={profile.response.friends} />           

            </div>
            <div style={{ 
                boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)', 
                height:'30%', 
                width:'100%', 
                marginTop:'2%', 
                borderRadius:'10px'}}
                className=''>

                <CoordinateMeetup profile={profile.response}/>
                
            </div>
        </div>
        <div style={{ 
            boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)', 
            width:'25%', 
            borderRadius:'10px', 
            border:'1px solid #D6300F'}}
             className='mx-sm-auto mx-md-auto'>
              <Itinerary profile={profile.response}/>                      
        </div>
    </div>
)
}

export default MyProfile