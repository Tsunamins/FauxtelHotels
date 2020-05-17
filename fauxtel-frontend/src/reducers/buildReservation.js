export default function buildReservation(state = {room: [], dates: []}, action) {
 
  switch (action.type) {
    case "SET_ROOM_SELECTION":  
      return {...state, room:  [action.room]}
  // case "SET_DATES":
  //     return {...state, dates: action.dates}
      
      default:
          return state
      }
    }