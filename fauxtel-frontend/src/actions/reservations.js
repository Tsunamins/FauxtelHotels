export const setAllReservations = reservations => {    
    return {
        type: "GET_RESERVATIONS",
        reservations 
    }
  }

export const addReservation = res => {
  return {
    type: "ADD_RES",
    res
  }
}
  
export const getReservations = () => {  
    return dispatch => {
       return fetch('http://localhost:3000/api/v1/reservations')
        .then(resp => resp.json())
        .then(response => {
            if(response.error){
                alert(response.error)
            } else {
              dispatch(setAllReservations(response))
            }
            })
            .catch(console.log)
          }
  }

export const createReservation = (res_info) => {
  console.log(res_info)
    return dispatch => {
      return fetch('http://localhost:3000/api/v1/reservations', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(res_info)
      })
        .then(resp => resp.json())
        .then(response => {
          if(response.error){
            alert(response.error)
          } else {
            dispatch(addReservation(response))
          }
        })
        .catch(console.log)
    }
}