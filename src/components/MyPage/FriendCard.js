import { useContext } from 'react';
import { Context } from '../../App';

const FriendCard = ({ friend }) => {
  const { defaultImage } = useContext(Context);

  return (
    <div>
      <div>
        <div>
          <img src={friend.profileimg || defaultImage}/>
        </div>
        <div>
          <div>
            <h1>{friend.username}</h1>
            <p>{friend.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
