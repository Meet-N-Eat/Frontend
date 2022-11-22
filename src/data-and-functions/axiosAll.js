import axios from "axios"

export async function axiosAll(method, path, authToken, dispatch, body) {
   const baseURL = "http://localhost:8000"
   const headers = {
      headers: {
         Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true
   }
   let res

   switch (method) {
      case "GET":
         res = await axios.get(`${baseURL}${path}`, headers)
         if(path === '/users/refresh') {
            dispatch({key: "token", value: res.data.token})
            dispatch({key: "username", value: res.data.user.username})
            dispatch({key: "response", value: res.data.user})
         } else {
            dispatch({key: "response", value: res.data})
         }
         break

      case "PUT":
         res = await axios.put(`${baseURL}${path}`, body, headers)
         break

      case "POST":
         res = await axios.post(`${baseURL}${path}`, body, headers)
         if(path === '/users/login') {
            dispatch({key: "token", value: res.data.token})
            dispatch({key: "response", value: res.data.user})
         } 
         break

      case "DELETE":
         res = await axios.delete(`${baseURL}${path}`, headers)
         break

      default:
         break
   }

   return res
}
