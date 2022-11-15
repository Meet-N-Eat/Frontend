import axios from "axios"

export async function axiosAll(method, path, authToken, dispatch, body) {
   const baseURL = "http://localhost:8000"
   const headers = {
      headers: {
         Authorization: `Bearer ${authToken}`,
      },
   }
   let res
   switch (method) {
      case "GET":
         res = await axios.get(`${baseURL}${path}`, headers)
         dispatch({key: "response", value: res.data})
         break

      case "PUT":
         res = await axios.put(`${baseURL}${path}`, body, headers)
         break

      case "POST":
         res = await axios.post(`${baseURL}${path}`, body, headers)
         !authToken && dispatch({key: "token", value: res.data.token})
         break

      case "DELETE":
         res = await axios.delete(`${baseURL}${path}`, headers)
         break

      default:
         break
   }

   return res
}

export function axiosReducer(state, object) {
   switch (object.key) {
      case "initialize":
         return object.value

      default:
         return {...state, [object.key]: object.value}
   }
}
