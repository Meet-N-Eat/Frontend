function toggleModal(e) {
   if (e?.target.className.includes('modals') && !e?.target.className.includes('content')) return false
   
   return true
}

export default toggleModal
