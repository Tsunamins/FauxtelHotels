export default function buildReservation(state = {room: [], dates: [], allResv: [], resv: []}, action) {
 console.log(action)
  switch (action.type) {
    case "SET_ROOM_SELECTION":  
      return {...state, room:  [action.room]}
  // case "SET_DATES":
  //     return {...state, dates: action.dates}
    case "SET_USER_RESERVATIONS":
      return {...state, allResv: [action.resv]}
    case "SET_MODIFY_RESV":
      return {...state, resv: [action.resv] }
      default:
          return state
      }
    }