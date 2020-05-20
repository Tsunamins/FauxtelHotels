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

export const deleteReservation = res => {
  console.log(res)
  return {
    type: "DELETE_RES",
    res
  }
}

export const updateReservation = res => {
  return {
    type: "UPDATE_RES",
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
              console.log(response.data)
              dispatch(setAllReservations(response.data))
            }
            })
            .catch(console.log)
          }
  }

export const createReservation = (res_info) => {

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

export const cancelReservation = (res_id) => {
  console.log(res_id)
  const token = localStorage.getItem("token")
  if(token){
     return dispatch => {
    
      return fetch(`http://localhost:3000/api/v1/reservations/${res_id}`, {
    
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    })
      .then(resp => {
        if (resp.error){
          alert(resp.error)
        }else {
     
           dispatch(deleteReservation(res_id))
           alert("Reservation Cancelled")
      
   
      
    }
  })
      .catch(error => console.log(error))

  }
}
}


export const modifyReservation = (res_id) => {
  console.log(res_id)
  const token = localStorage.getItem("token")
  if(token){
     return dispatch => {
    
      return fetch(`http://localhost:3000/api/v1/reservations/${res_id}`, {
    
      method: "PATCH",
      headers: {
        "Authorization": token
      }
    })
      .then(resp => {
        if (resp.error){
          alert(resp.error)
        }else {
     
           dispatch(updateReservation(res_id))
           alert("Reservation Updated")
      
   
      
    }
  })
      .catch(error => console.log(error))

  }
}
}






















