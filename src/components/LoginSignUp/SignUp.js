import React, { useContext, useReducer, useState } from 'react';
import { Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { Context } from '../../App';

const SignUp = () => {
  // const initialState = {
  //   username: '',
  //   password: '',
  //   confirmPassword: '',
  //   email: ''
  // }
  
  // State Hooks and Variables
  // ===========================================================================
  const [loggedInUser, dispatchUser] = useReducer(axiosReducer, { username: '', password: ''})
  // const [loggedInUser, dispatch] = useReducer(axiosReducer, initialState)
  const [error, dispatchError] = useReducer(axiosReducer, { username: false, email: false })
  // const { dispatchUser } = useContext(Context)
  const [nextModal, setNextModal] = useState(false)
  // const navigate = useNavigate()
  
  // Functions
  // ===========================================================================
  function changeHandler(e) {
    dispatchUser({
      key: e.target.classList[0],
      value: e.target.value
    })
  }

  async function submitHandler(e) {
    e.preventDefault()
    if(loggedInUser.password === loggedInUser.confirmPassword) {
      const response = await axiosAll('POST', `/users/signup`, null, dispatchUser, loggedInUser)
      const response2 = await axiosAll('POST', `/users/signin`, null, dispatchUser, loggedInUser)
      // console.log(response.data)
      if (typeof(response.data) === 'string') {
        response.data.indexOf('{ username:') !== -1 ?
          dispatchError({ key: 'username', value: true })
          : dispatchError({ key: 'username', value: false })

        response.data.indexOf('{ email:') !== -1 ?
          dispatchError({ key: 'email', value: true })
          : dispatchError({ key: 'email', value: false })
      }
      else { 
        setNextModal(true)
        axiosAll('GET', `/users/username/${response.data.username}`, response2.data.token, dispatchUser)
      }
    }
  }

  // Return
  // ===========================================================================
  return (
    <div>
        {nextModal ? 
        <div>
          <Row>
            <h1>Successfully registered!</h1>
          </Row>
          <Row>
            <Link to='/profile'>
              <button>Set up your profile</button>
            </Link>
          </Row>
          <Row>
            <Link to='/'>Skip</Link>
          </Row>
        </div>
        : 
        null
      }
      <div className='container'>
        <form 
          style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:"center"}} 
          action=''
          onSubmit={submitHandler}
        >
          {error.username && <h1>Username already taken, please try another.</h1>}
          <input
            className='username' 
            style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
            type='text' 
            placeholder='Username'
            onChange={changeHandler}
            value={loggedInUser.username}
          ></input>
          <input
            className='password' 
            style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
            type='password' 
            placeholder='Password'
            onChange={changeHandler}
            value={loggedInUser.password}
          ></input>
          <input
            className='confirmPassword' 
            style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
            type='password' 
            placeholder='Confirm Password'
            onChange={changeHandler}
            value={loggedInUser.confirmPassword}
          ></input>
          {error.email && <h1>Email already taken, please try another.</h1>}
          <input
            className='email' 
            style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
            type='text' 
            placeholder='Email'
            onChange={changeHandler}
            value={loggedInUser.email}
          ></input>
          <Button 
            style={{borderRadius:'5px', backgroundColor:'#D6300F', color:'white', borderColor:'#D6300F'}} 
            type='submit'
            variant="primary">
              Submit
          </Button>{' '}
        </form>
      </div>
      </div>
  );
};

export default SignUp;
