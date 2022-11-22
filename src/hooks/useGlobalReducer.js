import {useReducer} from 'react'

function useGlobalReducer(initialState) {
	function globalReducer(state, object) {
		switch (object.key) {
			case 'initialize':
				return object.value

			default:
				return {...state, [object.key]: object.value}
		}
	}

	return useReducer(globalReducer, initialState)
}

export default useGlobalReducer
