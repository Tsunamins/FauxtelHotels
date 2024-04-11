export default function locsReducer(state = [], action) {
    switch (action.type) {
        case 'GET_LOCS':
            return action.locations
        default:
            return state
    }
}