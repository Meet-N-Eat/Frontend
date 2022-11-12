import React from 'react'

function ProfileModal() {
	return (
		<div className='h-60 w-72 modal-bg grid-centered border mt-36 mx-auto p-4'>
			<div className='grid place-content-center'>
				<ProfileCard user={user._id} />
			</div>
			<p className='text-white'>{user.about}</p>
			<OutreachButtons
				friends={friends()}
				user={user}
				friendRequestHandler={friendRequestHandler}
			/>
		</div>
	)
}

export default ProfileModal
