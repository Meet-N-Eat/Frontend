import { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Context } from '../../App';

const FriendCard = ({ friend }) => {
  const { defaultImage } = useContext(Context);

  return (
    <Card
      style={{
        border: '1px solid #EB3510',
        width: '90%',
        padding: '3%',
        marginBottom: '5%',
      }}
    >
      <Row>
        <Col>
          <Card.Img
            style={{
              border: '1px solid #EB3510',
              borderRadius: '100%',
            }}
            variant='top'
            src={friend.profileimg || defaultImage}
          />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{friend.username}</Card.Title>
            <Card.Text style={{ fontSize: '0.8rem' }}>
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
