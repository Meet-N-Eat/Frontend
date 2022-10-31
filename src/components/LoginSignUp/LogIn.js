import { useReducer, useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Context } from '../../App';
import { axiosAll } from '../../data-and-functions/axiosAll';

const LogIn = () => {
  // State Hooks and Variables
  // ===========================================================================
  const component = useRef({ isMounted: false })
  const [login, dispatch] = useReducer((state, object) => {
    switch(object.key) {
      case 'success':
        return {...state, success: object.value}

      case 'badLogin':
        return {...state, badLogin: object.value}

      default:
        return state
    }
  }, { success: false, badLogin: false})
  const { loggedInUser, dispatchUser } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
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
    const response = await axiosAll('POST', `/users/signin`, null, dispatchUser, loggedInUser)

    response.data.token ? dispatch({
      key: 'success',
      value: true
    })
    : dispatch({
      key: 'badLogin',
      value: true
    })

    dispatchUser({ 
      key: 'password',
      value: ''
    })
  }

  useEffect(() => {
    component.isMounted ?
      axiosAll('GET', `/users/username/${loggedInUser.username}`, loggedInUser.token, dispatchUser) && navigate('/') 
      : component.isMounted = true
  },[login.success])

  // Return
  // ===========================================================================
  return (
    <div>
      <div className='container'>
        <h1>LOG IN</h1>
        { location.state !== null && <h2>You'll need to log in to access this feature!</h2> }
        <form  
          action=''
          onSubmit={submitHandler}
        >
          {login.badLogin && <h1>Bad username or password. Please try again.</h1>}
          <input 
            className='username' 
            type='text' 
            placeholder='Username'
            onChange={changeHandler}
            value={loggedInUser.username}
          ></input>
          <input 
            className='password' 
            type='password' 
            placeholder='Password'
            onChange={changeHandler}
            value={loggedInUser.password}
          ></input>
          <button  
            type='submit' 
          >Submit</button>
      </form>
    </div>
    <Link to='/users/authentication/signup'>
      Not registered? Sign up here
    </Link>
  </div>
  );
};

export default LogIn;
