export const buildReservation = room => {
    
    return {
      type: "SET_ROOM_SELECTION",
      room
    }
  }

export const setUserReservations = resv => {
    return {
      type: "SET_USER_RESERVATIONS",
      resv
    }
}

// export const startOver = data => {
//   return {
//     type: "START_OVER"
//   }
// }

export const getRoom = (room_id) => {
      
    //return dispatch (built in) as an argument, a thunk function 
    return dispatch => {

     return fetch(`http://localhost:3000/api/v1/rooms/${room_id}`)
      .then(resp => resp.json())
      .then(response => {
          if(response.error){
              alert(response.error)
          } else {
            console.log(response)
            dispatch(buildReservation(response))
          }
          })
          .catch(console.log)
        }
}

export const getUserReservations = (user_id) => {
  return dispatch => {
  const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/users/${user_id}`, {
      headers: {
        "Authorization": token
      }
    })
      .then(resp => resp.json())
 
      .then(response => {
        if (response.error) {
          alert("Not authorized - user reservations")
        } else {
          console.log(response.data.attributes.reservations)
            dispatch(setUserReservations(response.data.attributes.reservations))
        }
          })      
      .catch(console.log)
}
}
