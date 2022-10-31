import { Col, Row, Nav, Tab } from 'react-bootstrap';
import PersonalInfo from './PersonalInfo';
import Troubleshooting from './Troubleshooting';
import SearchQuestions from './SearchQuestions';
import UserInteractions from './UserInteractions';

const FAQ = () => {

  return (
    <div>
      <div>
        
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="first">troubleshooting</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">user interactions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">search questions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">personal info</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          <Tab.Content>
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
