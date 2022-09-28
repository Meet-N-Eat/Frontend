import React from 'react';
import Login from '../components/LogIn';
import SignUp from '../components/SignUp';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap'

const LogInSignUp = () => {
  const { option } = useParams();

  const [loginSignup, setLoginSignup] = useState('');

  useEffect(() => {
    setLoginSignup(option);
  }, [option]);

  return (
    <>
      <h1 style={{backgroundColor:'#eb350f', fontFamily: 'DegularBlack', letterSpacing: '3px', marginTop:'5%', width:'15%', textAlign:'center', color:'white', padding:'1%', margin:'0 auto', borderRadius:'10px 10px 0 0'}}>MEET & EAT</h1>
      <div style={{border:'1px solid #D6300F', padding:'1%', width:'40%', margin:'0 auto', borderRadius:'5px', boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)'}}>
          <div style={{margin:'0 auto', display:'flex', justifyContent:'center', marginTop:'2%', marginBottom:'1%'}}>
              <Nav style={{color:'black', borderRadius:'5px 5px 0 0', width:'80%', display:'flex', justifyContent:'center', borderBottom:"1px solid #D6300F"}} variant="tabs" defaultActiveKey="/login">
              <Nav.Item>
                <Nav.Link style={{color:'black', borderTop:'1px solid #D6300F', borderLeft:'1px solid #D6300F', borderRight:'1px solid #D6300F'}} onClick={() => setLoginSignup('login')}>Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{color:'black', borderTop:'1px solid #D6300F', borderRight:'1px solid #D6300F'}} onClick={() => {setLoginSignup('signup')}}>Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div style={{}}>
            {loginSignup === 'login' && <Login />}
            {loginSignup === 'signup' && <SignUp />}
          </div>

      </div>
    </>
  );
};

export default LogInSignUp;
