export default function reservations(state = {reservations: []}, action) {
 
    switch (action.type) {
      case 'GET_RESERVATIONS':  
        return {...state, reservations:  action.reservations}
      case 'ADD_RES':
         
        return {...state, reservations: [...state.reservations, action.res]}
      case 'DELETE_RES':
        return  state.reservations.filter(res => res.id === action.res ? false : true)
      case 'UPDATE_RES':
        return state.reservations.map(res => res.id === action.res.id ? action.res : res)
        
        default:
            return state
        }
      }