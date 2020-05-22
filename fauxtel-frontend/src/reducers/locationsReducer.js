export default function locsReducer(state = [], action) {
 
    switch (action.type) {
      case 'GET_LOCS':
        return action.locs     
        
        default:
            return state
        }
      }