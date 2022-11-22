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
	const [persist, setPersist] = useState(
		JSON.parse(localStorage.getItem('persist' || false))
	)

	return (
		<AuthContext.Provider value={{loggedInUser, dispatchUser, persist, setPersist, defaultImage}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
