import axios from "axios"

export async function axiosAll(method, path, authToken, dispatch, body) {
   const baseURL = 'http://localhost:8000'
   const headers = { 
      headers: { 
         'Authorization': `Bearer ${authToken}`,
      }
   }
   console.log('method', method, 'path', path)
   let res
   switch(method) {
      case 'GET':
         res = await axios.get(`${baseURL}${path}`, headers)
         dispatch({ key: 'response', value: res.data })
         break
      
      case 'PUT':
         res = await axios.put(`${baseURL}${path}`, body, headers)
         break

      case 'POST':
         res = await axios.post(`${baseURL}${path}`, body, headers)
         !authToken ? dispatch({ key: 'token', value: res.data.token})
            : dispatch({ key: 'response', value: res.data })
         break

      case 'DELETE':
         res = await axios.delete(`${baseURL}${path}`, headers)
         dispatch({ key: 'response', value: res.data })
         break

      default:
         break
   }

   return res
}

export function axiosReducer (state, object) {
   switch(object.key) {           
      case 'loadProfile':
         return {
            ...state, 
            profileimg: object.value.profileimg,
            about: object.value.about,
            location: object.value.location,
            displayname: object.value.displayname,
            email: object.value.email,
            likedrestaurants: object.value.likedrestaurants
         }
         
      case 'logout':
         return { username: '', password: ''}

      default:
         return {...state, [object.key]: object.value}
   }
}