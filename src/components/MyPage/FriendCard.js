import { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Context } from '../../App';

const FriendCard = ({ friend }) => {
  const { defaultImage } = useContext(Context);

  return (
    <Card
    >
      <Row>
        <Col>
          <Card.Img
            variant='top'
            src={friend.profileimg || defaultImage}
          />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{friend.username}</Card.Title>
            <Card.Text>
              {' '}
              {friend.location}{' '}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default FriendCard;
