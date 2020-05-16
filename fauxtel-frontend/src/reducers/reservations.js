export default function reservations(state = {reservations: []}, action) {
    switch (action.type) {
      case 'GET_RESERVATIONS':  
        return {...state, reservations:  action.reservations}
      case 'ADD_RES':
         
        return {...state, reservations: [...state.reservations, action.res]}   
        
        default:
            return state
        }
      }