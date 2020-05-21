const INITIAL_STATE = {room: [], dates: [], allResv: [], resv: []}

export default function buildReservation(state = INITIAL_STATE, action) {

  switch (action.type) {
    case "SET_ROOM_SELECTION":  
      return {...state, room:  [action.room]}
    case "CLEAR_ROOM":
      return INITIAL_STATE
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