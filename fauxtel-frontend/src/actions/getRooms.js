
export const setRooms = rooms => {    
  return {
      type: "GET_ROOMS",
      rooms 
  }
}

export const getRooms = () => {
    console.log("c")
    //return dispatch (built in) as an argument, a thunk function 
    return dispatch => {

     return fetch('http://localhost:3000/api/v1/rooms')
      .then(resp => resp.json())
      .then(response => {
          if(response.error){
              alert(response.error)
          } else {
            console.log("d")
            //console.log(response)
            dispatch(setRooms(response.data))
            }
        })
          .catch(console.log)
    }
    console.log("e")
}
