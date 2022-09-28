// Creates search parameters from the search filter options selected
// ========================================================================

export function getSearchParams(searchCriteria) {
   if(!searchCriteria) return
   // Create an array of keys from searchCriteria object
   const keyArray = Object.keys(searchCriteria)
   
   // Declare searchString and set the base path depending on whether a search string was entered by the user
   let searchString
   searchCriteria.searchString ?
      (searchString = '/results/' + searchCriteria.searchString.toLowerCase())
      : (searchString = '/results/no-search-string')
   
   // Change keys for backend
   const updatedKeys = keyArray.map(key => {
      switch(key) {
         case 'city':
            return 'location.city'
         
         case 'category':
            return 'categories.title'

         default:
            return key
      }
   })
   // Add search criteria that have a value as query parameters in searchString
   for(let i=1; i < keyArray.length; i++) {
      searchCriteria[keyArray[i]] && (
         searchString.includes('?') ?
         (searchString += `&${updatedKeys[i]}=${searchCriteria[keyArray[i]].toLowerCase()}`)
         : (searchString += `?${updatedKeys[i]}=${searchCriteria[keyArray[i]].toLowerCase()}`)
      )  
   }
   return searchString
}

export function buildSearchParams(paramArray, valueArray) {
   if(!paramArray) return '?empty=empty'
   let searchParams = ''
   for(let i=0; i < paramArray.length; i++) {
         searchParams.includes('?') ?
         (searchParams += `&${paramArray[i]}=${valueArray[i]}`)
         : (searchParams += `?${paramArray[i]}=${valueArray[i]}`)
   }
   return searchParams
}