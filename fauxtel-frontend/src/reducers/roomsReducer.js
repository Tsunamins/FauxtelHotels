export default function roomsReducer(state = {rooms: []}, action) {
    switch (action.type) {
      case 'GET_ROOMS':
        return {rooms: action.payload}
        default:
            return state
        }
      }