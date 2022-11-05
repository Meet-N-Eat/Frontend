import React, {  useContext, useEffect, useReducer, useState } from 'react';
import { Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll';
import { Context } from '../../App';

const SignUp = () => {
  // State Hooks and Variables
  // ===========================================================================
  const { dispatchUser, loggedInUser } = useContext(Context)
  const [error, dispatchError] = useReducer(axiosReducer, { username: false, email: false })
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Functions
  // ===========================================================================
  function modalHandler() {
    setShow(prevState => !prevState)
  }

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

      if (typeof(response.data) === 'string') {
        response.data.indexOf('{ username:') !== -1 ?
          dispatchError({ key: 'username', value: true })
          : dispatchError({ key: 'username', value: false })

        response.data.indexOf('{ email:') !== -1 ?
          dispatchError({ key: 'email', value: true })
          : dispatchError({ key: 'email', value: false })
      } else if (!error.username && !error.email) {
        setSuccess(true)
        setShow(!show)
      }
    }
  }
  console.log(success)
  useEffect(() => {
    console.log(loggedInUser.token)
  }, [loggedInUser.token])
  
  useEffect(() => {
      if (success) {
        axiosAll('POST', `/users/signin`, null, dispatchUser, loggedInUser)
        
      }
  }, [success])


  // Return
  // ===========================================================================
  return (
    <div className='flex items-center justify-center row-start-2'>
      <Modal 
      show={show} 
      onHide={modalHandler}
      className='text-center mt-36'>
        <div closeButton>
          <h1 className='header text-2xl text-red-900 py-2'>Successfully registered!</h1>
        </div>
        <div>
          <div>
            <Link to='/profile'>
              <button className='account-button text-xl'>Set up your profile</button>
            </Link>
          </div>
          <div>
            <Link to='/'><p className='text-xl py-2 hover:text-red-900'>Skip</p></Link>
          </div>
        </div>
      </Modal>
      <div className='flex flex-col justify-center bg-white opacity-90 rounded-2xl w-60 md:w-96 p-2 space-y-4'>
        <h1 className='header text-2xl text-red-900 mx-auto pt-2'>SIGN UP</h1>
        <form
          className='space-y-2 md:space-y-4'  
          action=''
          onSubmit={submitHandler}
        >
          {error.username && <p className='text-center text-red-800 mx-auto text-xs md:text-sm'>Username already exists</p>}
          <input
            className='username input w-full mx-auto border border-slate-800'   
            type='text' 
            placeholder='Username'
            onChange={changeHandler}
            value={loggedInUser.username}
          ></input>
          <input
            className='password input w-full mx-auto border border-slate-800'
            type='password' 
            placeholder='Password'
            onChange={changeHandler}
            value={loggedInUser.password}
          ></input>
          <input
            className='confirmPassword input w-full mx-auto border border-slate-800'  
            type='password' 
            placeholder='Confirm Password'
            onChange={changeHandler}
            value={loggedInUser.confirmPassword}
          ></input>
          {error.email && <p className='text-center text-red mx-auto text-xs md:text-sm'>Email already exists</p>}
          <input
            className='email input w-full mx-auto border border-slate-800'  
            type='text' 
            placeholder='Email'
            onChange={changeHandler}
            value={loggedInUser.email}
          ></input>
          <Row>
            <button  
              className='account-button w-20 mx-auto mb-2'
              type='submit'
            >Submit</button>
          </Row>
        </form>
      </div>
      </div>
  );
};

export default SignUp;
