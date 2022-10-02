import React from 'react';
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import Troubleshooting from './Troubleshooting';
import SearchQuestions from './SearchQuestions';
import UserInteractions from './UserInteractions';

const FAQ = () => {
  // All static info?
  const [activeElement, setActiveElement] = useState('personalinfo');

  return (
    <div>
      <div 
        style={{
        border: '1px solid #D6300F',
        margin: '0 auto',
        marginTop: '5%',
        width: '50%',
        height: 'auto',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow:'2px 5px 26px -9px rgba(0,0,0,0.75)',
        }}>
        
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3} >
          <Nav variant="pills" className="flex-column" >
            <Nav.Item>
              <Nav.Link style={{color: 'white', border: '1px solid black', backgroundColor: '#eb350f', margin: '0.2rem',}} eventKey="first">troubleshooting</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{color: 'white', border: '1px solid black', backgroundColor: '#eb350f', margin: '0.2rem'}} eventKey="second">user interactions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{color: 'white', border: '1px solid black', backgroundColor: '#eb350f', margin: '0.2rem'}} eventKey="third">search questions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{color: 'white', border: '1px solid black', backgroundColor: '#eb350f', margin: '0.2rem'}} eventKey="fourth">personal info</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content style={{marginTop: '1rem'}}>
            <Tab.Pane eventKey="first">
              <Troubleshooting />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <UserInteractions />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <SearchQuestions />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <PersonalInfo />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>


      </div>
    </div>
  );
};

export default FAQ;
