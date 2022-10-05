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
      case 'response':
         return {...state, response: object.value}
      
      case 'searchString':
         return {...state, searchString: object.value}

      case 'username':
         return {...state, username: object.value}

      case 'password':
         return {...state, password: object.value}

      case 'token':
         return {...state, token: object.value}

      case 'profileimg':
         return {...state, profileimg: object.value}
         
      case 'location':
         return {...state, location: object.value}

      case 'displayname':
         return {...state, displayname: object.value}

      case 'email':
         return {...state, email: object.value}
         
      case 'about':
         return {...state, about: object.value}      
      
      case 'confirmPassword':
         return {...state, confirmPassword: object.value}      
      
      case 'stars':
         return {...state, stars: object.value}      
      
      case 'body':
         return {...state, body: object.value}      
      
      case 'friend':
         return {...state, friend: object.value}      
      
      case 'date':
         return {...state, date: object.value}      
      
      case 'restaurant':
         return {...state, restaurant: object.value}      
      
      case 'participants':
         return {...state, participants: object.value}      
      
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

      case 'missingBody':
         return {...state, missingBody: object.value}
         
      case 'missingStars':
         return {...state, missingStars: object.value}
         
      default:
         return state
   }
}