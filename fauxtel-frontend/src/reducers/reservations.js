export default function reservations(state = {reservations: []}, action) {
   
    switch (action.type) {
      case 'GET_RESERVATIONS':  
        return action.reservations
      case 'ADD_RES':
         
        return state.concat(action.res)
      case 'DELETE_RES':
        return  state.filter(res => res.id === action.res ? false : true)
      case 'UPDATE_RES':
        return state.map(res => res.id === action.res.id ? action.res : res)
        
        default:
            return state
        }
      }