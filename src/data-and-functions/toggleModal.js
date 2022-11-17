function toggleModal(e, toggle) {
   if (toggle) {
      if (e.target.className.includes('modals') && !e.target.className.includes('content'))
         return false
   } 
   
   return true
}

export default toggleModal
