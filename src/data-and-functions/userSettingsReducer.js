export function userSettingsReducer(state, object) {
    switch(object.key) {
        case 'username':
            return {...state, username: object.value}
        case 'profileimg': 
            return {...state, profileimg: object.value}
        case 'about':
            return {...state, about: object.value}
        case 'location':
            return {...state, location: object.value}
        case 'displayname':
            return {...state, displayname: object.value}
        case 'email':
            return {...state, email: object.value}
        case 'likedrestaurants':
            return {...state, likedrestaurants: object.value}
    default:
        return state
    }
}