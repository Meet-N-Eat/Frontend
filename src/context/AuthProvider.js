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
	const [loginStatus, setLoginStatus] = useState(
		JSON.parse(localStorage.getItem('loginStatus' || false))
	)

	return (
		<AuthContext.Provider value={{loggedInUser, dispatchUser, loginStatus, setLoginStatus, defaultImage}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
