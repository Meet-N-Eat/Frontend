import defaultImage from '../../assets/defaultImage.png'

const FriendCard = ({friend}) => {
	return (
		<div className='flex flex-col items-center space-y-3 pb-4'>
			<div className='friend-image'>
				<img
					src={friend.profileimg || defaultImage}
					alt='friend-profile'
					className='profile-image img'
				/>
			</div>
			<div>
				<div className='text-center text-white text-sm md:text-base'>
					<h1 className='font-normal'>{friend.username}</h1>
					<p>{friend.location}</p>
				</div>
			</div>
		</div>
	)
}

export default FriendCard
