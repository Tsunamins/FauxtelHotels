export default function buildReservation(state = [], action) {
 
    switch (action.type) {
      case "SET_ROOM_SELECTION":  
        return state.concat(action.room)
  
        default:
            return state
        }
      }