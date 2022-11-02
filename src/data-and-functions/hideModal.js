export function hideModal(setShow, modalHandler) {
   window.addEventListener('click', e => {
		typeof e.target.className === 'string' && 
			e.target.className.includes('modals') && 
				!e.target.className.includes('content') && (
					setShow ? 
						setShow(prev => !prev)
						: modalHandler && modalHandler(e)
				)
	})
}