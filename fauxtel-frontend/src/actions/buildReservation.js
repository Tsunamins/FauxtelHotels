export const buildReservation = room => {
    
    return {
      type: "SET_ROOM_SELECTION",
      room
    }
  }

  export const getRoom = (room_id) => {
      
    //return dispatch (built in) as an argument, a thunk function 
    return dispatch => {

     return fetch(`http://localhost:3000/api/v1/rooms/${room_id}`)
      .then(resp => resp.json())
      .then(response => {
          if(response.error){
              alert(response.error)
          } else {
            //console.log(response)
            dispatch(buildReservation(response))
          }
          })
          .catch(console.log)
        }
}