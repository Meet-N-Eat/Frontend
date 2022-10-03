import React, { useReducer } from 'react';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';

const SignUp = () => {
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  }
  
  // State Hooks and Variables
  // ===========================================================================
  const [signupInfo, dispatch] = useReducer(axiosReducer, initialState)
  const navigate = useNavigate()
  
  // Functions
  // ===========================================================================
  function changeHandler(e) {
    dispatch({
      key: e.target.classList[0],
      value: e.target.value
    })
  }

  function submitHandler(e) {
    e.preventDefault()
    signupInfo.password === signupInfo.confirmPassword &&
      axiosAll('POST', `/users/signup`, null, dispatch, signupInfo)
    navigate('/users/authentication/login')
  }

  // Return
  // ===========================================================================
  return (
    <div>
      <div className='container'>
        <form 
          style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:"center"}} 
          action=''
          onSubmit={submitHandler}
        >
          <input
            className='username' 
            style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
            type='text' 
            placeholder='Username'
            onChange={changeHandler}
            value={signupInfo.username}
          ></input>
          <input
            className='password' 
            style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
            type='password' 
            placeholder='Password'
            onChange={changeHandler}
            value={signupInfo.password}
          ></input>
          <input
            className='confirmPassword' 
            style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
            type='password' 
            placeholder='Confirm Password'
            onChange={changeHandler}
            value={signupInfo.confirmPassword}
          ></input>
          <input
            className='email' 
            style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
            type='text' 
            placeholder='Email'
            onChange={changeHandler}
            value={signupInfo.email}
          ></input>
          <Button style={{borderRadius:'5px', backgroundColor:'#D6300F', color:'white', borderColor:'#D6300F'}} type='submit' variant="primary">Submit</Button>{' '}
        </form>
      </div>
      </div>
  );
};

export default SignUp;
