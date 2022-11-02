export function hideModal(setShow) {
   window.addEventListener('click', e => {
		typeof e.target.className === 'string' && 
			e.target.className.includes('modala') && 
				!e.target.className.includes('content') &&
					setShow(prev => !prev)
	})
}