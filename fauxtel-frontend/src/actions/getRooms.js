export function getRooms() {
    //return dispatch (built in) as an argument, a thunk function 
    return (dispatch) => {
      fetch('http://localhost:3000/api/v1/rooms')
      .then(resp => resp.json())
     
      .then(rooms => dispatch({ //brought in here to wait for connection from backend, rather than automatcially dispatching in connect
        type: 'GET_ROOMS',  //dispatch must have at least a type, 
        payload: rooms       //and since getting and using data they next key needed is payload
      }))
    }
  }