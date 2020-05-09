export default function reservations(state = {reservations: []}, action) {
    console.log(action)
    switch (action.type) {
      case 'GET_RESERVATIONS':
         
        return {...state, reservations:  action.reservations}     
        
        default:
            return state
        }
      }