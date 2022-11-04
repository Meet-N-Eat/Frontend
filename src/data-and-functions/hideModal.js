export function hideModal(setShow, modalHandler) {
   window.addEventListener('click', e => {
		if(typeof e.target.className === 'string' && 
			e.target.className.includes('modals') && 
				!e.target.className.includes('content')) {
					console.log(e.target.className)
					setShow && setShow(prev => !prev)
					modalHandler && modalHandler(e)
				}
				
	})
}