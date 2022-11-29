import {Routes, Route} from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Layout from './components/Layout'
import PersistentLogin from './components/PersistentLogin'
import About from './components/About'
import Home from './components/Home/Home'
import Messages from './components/Messages/Messages'
import MessageChat from './components/Messages/MessageChat'
import MyPage from './components/MyPage/MyPage'
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail'
import SearchResults from './components/SearchResults/SearchResults'
import UserProfile from './components/UserProfile'
import FriendRequests from './components/FriendRequests/FriendRequests'
import LogIn from './components/LoginSignUp/LogIn'
import SignUp from './components/LoginSignUp/SignUp'
import CoordinateMeetup from './components/MyPage/CoordinateMeetup'
import Friends from './components/MyPage/Friends'
import Favorites from './components/MyPage/Favorites'
import Itinerary from './components/MyPage/Itinerary'

function App() {
	const {loggedInUser, dispatchUser} = useAuth()

	return (
		<Routes>
			<Route element={<PersistentLogin />}>
				<Route path='/' element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='users/authentication/login' element={<LogIn />} />
					<Route path='users/authentication/signup' element={<SignUp />} />
					<Route path='results/:searchString' element={<SearchResults />} />
					<Route path='restaurants/:restaurantId' element={<RestaurantDetail />} />
					<Route path='about' element={<About />} />

					<Route path='my-page' element={<MyPage />}>
						<Route
							index
							element={
								<CoordinateMeetup
									loggedInUser={loggedInUser}
									dispatchUser={dispatchUser}
								/>
							}
						/>
						<Route
							path='invite'
							element={
								<CoordinateMeetup
									loggedInUser={loggedInUser}
									dispatchUser={dispatchUser}
								/>
							}
						/>
						<Route path='friends' element={<Friends loggedInUser={loggedInUser} />} />
						<Route
							path='favorites'
							element={<Favorites loggedInUser={loggedInUser} />}
						/>
						<Route
							path='itinerary'
							element={<Itinerary loggedInUser={loggedInUser} />}
						/>
					</Route>
					<Route path='profile' element={<UserProfile />} />
					<Route path='messages' element={<Messages />} />
					<Route path='messages/:friendId' element={<MessageChat />} />
					<Route path='friendrequests' element={<FriendRequests />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
