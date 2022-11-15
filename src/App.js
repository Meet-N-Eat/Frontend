import {createContext, useReducer} from "react"
import {Routes, Route} from "react-router-dom"
import {axiosReducer} from "./data-and-functions/axiosAll"
import About from "./components/About"
import Home from "./components/Home/Home"
import Messages from "./components/Messages/Messages"
import MessageChat from "./components/Messages/MessageChat"
import MyPage from "./components/MyPage/MyPage"
import NavBar from "./components/Navigation/NavBar"
import RestaurantDetail from "./components/RestaurantDetail/RestaurantDetail"
import SearchResults from "./components/SearchResults/SearchResults"
import UserProfile from "./components/UserProfile/UserProfile"
import FriendRequests from "./components/FriendRequests/FriendRequests"
import LogIn from "./components/LoginSignUp/LogIn"
import SignUp from "./components/LoginSignUp/SignUp"

export const Context = createContext()

function App() {
   // Context variables
   const [loggedInUser, dispatchUser] = useReducer(axiosReducer, {username: "", password: ""})

   return (
      <div className='App h-full'>
         <Context.Provider
            value={{
               'loggedInUser': loggedInUser,
               'dispatchUser': dispatchUser,
            }}
         >
            <header className="row-start-1 row-span-1">
               <NavBar />
            </header>
            <main>
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/users/authentication/login' element={<LogIn />} />
                  <Route path='/users/authentication/signup' element={<SignUp />} />
                  <Route path='/results/:searchString' element={<SearchResults />} />
                  <Route path='/my-page' element={<MyPage />} />
                  <Route path='/profile' element={<UserProfile />} />
                  <Route path='/restaurants/:restaurantId' element={<RestaurantDetail />} />
                  <Route path='/messages' element={<Messages />} />
                  <Route path='/messages/:friendId' element={<MessageChat />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/friendrequests' element={<FriendRequests />} />
               </Routes>
            </main>
         </Context.Provider>
      </div>
   )
}

export default App
