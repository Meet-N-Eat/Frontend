export function formatDateTime(dateString) {
   // Format date string from the API timestamp
   const dateObj = new Date(dateString)
   const date = dateObj.toLocaleDateString()
   const time = dateObj.toLocaleTimeString("en", { timeStyle: 'short' })

   return [date, time]
}