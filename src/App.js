import { createContext, useReducer, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import FAQ from './components/FAQ/FAQ';
import Home from './components/Home/Home';
import LogInSignUp from './components/LoginSignUp/LogInSignUp';
import MessageCenter from './components/MessageCenter/MessageCenter';
import MyProfile from './components/MyProfile/MyProfile';
import NavBar from './components/Navigation/NavBar';
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail';
import SearchResults from './components/SearchResults/SearchResults';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import { axiosReducer } from './data-and-functions/axiosAll';

export const Context = createContext()

function App() {
  // Context variables
  const [loggedInUser, dispatchUser] = useReducer(axiosReducer, { username: '', password: ''})
  const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  const colorTemplate = {
    darkColor: '#D6300F',
    mediumColor: '#F7EEE6',
    lightColor: '#F0704E'
  }
  
  return (
    <div className="App">
        <Context.Provider value={{'loggedInUser': loggedInUser, 'dispatchUser': dispatchUser, 'defaultImage': defaultImage, 'colorTemplate': colorTemplate}}>
      <header>
        <NavBar />
      </header>
      <main>
          <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users/authentication/:option" element={<LogInSignUp />} />
            <Route path="/results/:searchString" element={<SearchResults />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/profile/settings" element={<ProfileSettings />} />
            <Route path="/restaurants/:restaurantId" element={<RestaurantDetail />} />
            <Route path="/message-center" element={<MessageCenter />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
      </main>
        </Context.Provider>
    
    </div>
  );
}

export default App;
