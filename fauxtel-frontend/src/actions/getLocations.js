
export const setLocs = (locs) => {   
    console.log(locs) 
    return {
        type: "GET_LOCS",
        locs 
    }
  }
  
  export const getLocs = () => {
      //return dispatch (built in) as an argument, a thunk function 
      return dispatch => {
  
       return fetch('http://localhost:3000/api/v1/locations')
        .then(resp => resp.json())
        .then(response => {
            if(response.error){
                console.log('resp err locations: ', response.error)
                alert(response.error)
            } else {
              console.log('dispatch locs',response)
              dispatch(setLocs(response.data))
            }
            })
            .catch(console.log)
          }
  }