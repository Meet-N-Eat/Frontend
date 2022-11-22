import {useReducer} from 'react'
import {createContext, useState, useReducer} from 'react'

const AuthContext = createContext({})

function AuthProvider({children}) {
	const [loggedInUser, dispatchUser] = useReducer(axiosReducer, {
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
	})
	const [loginStatus, setLoginStatus] = useState(
		JSON.parse(localStorage.getItem('loginStatus' || false))
	)

	return (
		<AuthContext.Provider value={{loggedInUser, dispatchUser, loginStatus, setLoginStatus}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
