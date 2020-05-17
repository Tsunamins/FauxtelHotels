export default function buildReservation(state = {room: [], dates: [], allResv: []}, action) {
 
  switch (action.type) {
    case "SET_ROOM_SELECTION":  
      return {...state, room:  [action.room]}
  // case "SET_DATES":
  //     return {...state, dates: action.dates}
    case "SET_USER_RESERVATIONS":
      return {...state, allResv: [action.resv]}
      default:
          return state
      }
    }