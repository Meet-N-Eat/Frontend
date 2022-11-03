export function hideModal(setShow, modalHandler) {
   window.addEventListener('click', e => {
		typeof e.target.className === 'string' && 
			e.target.className.includes('modals') && 
				!e.target.className.includes('content') && (
					console.log('hideModal') &&
					setShow ? 
						setShow(prev => !prev)
						: modalHandler && modalHandler(e)
				)
	})
}