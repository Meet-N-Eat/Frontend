export function hideModal(setShow) {
   window.addEventListener('click', e => {
		typeof e.target.className === 'string' && 
			e.target.className.includes('modala') && 
				setShow(prev => !prev)
	})
}