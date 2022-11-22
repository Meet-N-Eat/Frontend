import {useContext} from 'react'
import {AuthContext} from '../context/AuthProvider'

function useAuth() {
   const { loggedInUser } = useContext(AuthContext)
	return useContext(AuthContext)
}

export default useAuth
