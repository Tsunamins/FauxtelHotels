export default function reservations(state = {reservations: []}, action) {
  console.log(action)
    switch (action.type) {
      case 'GET_RESERVATIONS':  
        return {...state, reservations:  action.reservations}
      case 'ADD_RES':
         
        return {...state, reservations: [...state.reservations, action.res]}
      case 'DELETE_RES':
        return  state.reservations.filter(res => res.id === action.res ? false : true)
        
        default:
            return state
        }
      }