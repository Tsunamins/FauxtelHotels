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






















// export const cancelReservation = (resID) => {
//   console.log(typeof resID)
//   return dispatch => {
//   // const token = localStorage.getItem("token")
//   // console.log(token)
//   console.log(resID)

//     return fetch(`http://localhost:3000/api/v1/reservations/${resID}`, {
//       method: "DELETE",
//       headers: {

//         // "Authorization": token,
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       }
//     })
//       .then(resp => resp.json())
 
//       .then(response => {
      
//         if (response.error) {
//           alert(response.error)
//         } else {
//           console.log(response)
//             dispatch(deleteReservation(response))
//         }
//           })      
//       .catch(console.log)
// }
// }