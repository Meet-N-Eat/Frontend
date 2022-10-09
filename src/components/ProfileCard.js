import React, { useState, useContext } from 'react'
import { Card, Modal, Button } from 'react-bootstrap'
import { Context } from '../App'

const ProfileCard = ( { profileImg, username } ) => {
    
const { loggedInUser, dispatchUser } = useContext(Context)
 
return (
      <Card style={{ width: '4rem', height:'7rem', display:'flex', flexDirection:"column", justifyContent:"center", alignItems:'center'}}>
          <Card.Img className='mt-2 mb-0' style={{borderRadius:'50%', border:'1px solid #D6300F', width:"50px"}} src={profileImg} />
          <Card.Body style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
              <Card.Title style={{width:'100%', textAlign:'center', paddingTop:'1%'}}>{username} </Card.Title>
          </Card.Body>
      </Card>
)
}
export default ProfileCard
