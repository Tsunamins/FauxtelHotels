export default function locsReducer(state = {locations: []}, action) {
    switch (action.type) {
      case 'GET_LOCS':
        return {...state, locations:  action.locs}     
        
        default:
            return state
        }
      }