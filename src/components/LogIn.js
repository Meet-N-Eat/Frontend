import { useContext, useEffect, useReducer } from 'react';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import { axiosAll, axiosReducer } from '../data-and-functions/axiosAll';

const LogIn = () => {
  // State Hooks and Variables
  // ===========================================================================
  const [loginInfo, dispatch] = useReducer(axiosReducer, { username: '', password: '' })
  const { loggedInUser, dispatchUser } = useContext(Context)
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
    axiosAll('POST', `/users/signin`, null, dispatchUser, loginInfo)
  }

  useEffect(() => {
    dispatchUser({ key: 'username', value: loginInfo.username })
    loggedInUser.token && navigate('/home')
  },[loggedInUser.token])

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
              value={loginInfo.username}
            ></input>
            <input 
              className='password'
              style={{marginBottom:'2%', border:'1px solid #D6300F', borderRadius:'5px', padding:'4px'}} 
              type='password' 
              placeholder='Password'
              onChange={changeHandler}
              value={loginInfo.password}
            ></input>
            <Button 
              style={{borderRadius:'5px', backgroundColor:'#D6300F', color:'white', borderColor:'#D6300F'}} 
              type='submit' 
              variant="primary"
            >Submit</Button>{' '}
        </form>
      </div>
    </div>
  );
};

export default LogIn;
