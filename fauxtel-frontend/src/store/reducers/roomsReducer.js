export default function roomsReducer(state = { rooms: [] }, action) {
    switch (action.type) {
        case 'GET_ROOMS':
            return { ...state, rooms: action.rooms }
        default:
            return state
    }
}