import {createContext, useState} from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer'
import defaultImage from '../assets/defaultImage.png'

export const AuthContext = createContext({})

function AuthProvider({children}) {
	const [loggedInUser, dispatchUser] = useGlobalReducer({
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
	})
	const [loggedIn, setLoggedIn] = useState(
		JSON.parse(localStorage.getItem('loggedIn' || false))
	)

	return (
		<AuthContext.Provider value={{loggedInUser, dispatchUser, loggedIn, setLoggedIn, defaultImage}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
