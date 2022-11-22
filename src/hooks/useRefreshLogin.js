import { axiosAll } from '../data-and-functions/axiosAll'
import useAuth from './useAuth'

function useRefreshLogin() {
   const {dispatchUser} = useAuth()

   async function refresh() {
      await axiosAll('GET', '/users/refresh', null, dispatchUser)
   }

   return refresh
}

export default useRefreshLogin
