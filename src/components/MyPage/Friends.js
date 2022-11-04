import { useState, useReducer, useEffect } from 'react'
import { axiosAll, axiosReducer } from '../../data-and-functions/axiosAll'
import ProfileCard from '../ProfileCard'


const Friends = ({ loggedInUser }) => {
    const [searchCharacters, setSearchCharacters] = useState('')
    const [friends, dispatchFriends] = useReducer(axiosReducer, {})

    useEffect(() => {
        axiosAll('GET', `/users/${loggedInUser.response._id}/friends`, loggedInUser.token, dispatchFriends)
    }, [])

    function searchChange(e) {
        setSearchCharacters(e.target.value)
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <form>
                <input
                    onChange={searchChange} 
                    placeholder="search by name" 
                    className='input mb-4'
                />
            </form>
            <div className='main-bg rounded-2xl py-4 grid grid-cols-2 md:grid-cols-4 max-h-[23rem] overflow-y-auto'>
                {friends.response && friends.response.length > 0 ?
                    friends.response.filter(friend => searchCharacters === '' || friend.username.toLowerCase().includes(searchCharacters.toLocaleLowerCase()))
                        .map(friend => 
                            <div className='text-white py-4'>
                                <ProfileCard 
                                    key={friend._id} 
                                    user={friend._id} />
                            </div>)
                    : <div>you don't have any friends yet, send friend requests by clicking on other people who like the same restaurants you do.</div>
                }
            </div>
        </div>
    )
}

export default Friends