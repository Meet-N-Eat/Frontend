import {useState, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRefreshLogin from '../hooks/useRefreshLogin'
import { Spinner } from 'react-bootstrap'

function PersistentLogin() {
   const {loggedInUser, persist} = useAuth()
   const refresh = useRefreshLogin()
   const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
      let isMounted = true

      async function checkToken() {
         try {
            await refresh()
         }
         catch(err) {
            console.error(err)
         }
         finally {
            isMounted && setIsLoading(false)
         }
      }

      !loggedInUser?.token && persist ? checkToken() : setIsLoading(false)

      return () => isMounted = false

   }, [])

   return (
      <>
         {!persist
            ? <Outlet />
            : isLoading
               ? <div><Spinner animation='border' variant="light" /></div>
               : <Outlet />
         }
      </>
   )
}

export default PersistentLogin
