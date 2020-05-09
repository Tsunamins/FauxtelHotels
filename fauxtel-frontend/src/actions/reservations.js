

export const setAllReservations = reservations => {    
    console.log(reservations)
    return {
        
        type: "GET_RESERVATIONS",
        reservations 
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
              console.log(response)
              dispatch(setAllReservations(response))
            }
            })
            .catch(console.log)
          }
  }