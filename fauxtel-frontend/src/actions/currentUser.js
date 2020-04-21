export const setCurrentUser = user => {
    return {
        type: "SET_CURRENT_USER",
       
        payload: user
    }
}

export const login = credentials => {
    return dispatch => {

        return fetch("http://localhost:3000/api/v1/login", {
            //credentials: "include",
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(credentials) //hard-coded for now
        })
        .then(resp => resp.json())
        .then(resp =>{
            if (resp.error){
                alert(resp.error)
            } else {
                dispatch(setCurrentUser(resp.data))
                localStorage.setItem('token', resp.jwt)
            }
        })
        .catch(console.log)    
    }

}

export const getCurrentUser = () => {
    //new
    const token = localStorage.getItem("token")
    if (token) {
    return dispatch => {
      return fetch("http://localhost:3000/api/v1/get_current_user", {
       // credentials: "include",
        //method: "GET",
        headers: {
          //"Content-Type": "application/json"
          "Authorizatoin": token
        },
      })
        .then(resp => resp.json())
        .then(response => {
          if (response.error) {
            alert(response.error)
          } else {
            dispatch(setCurrentUser(response.data))
            
          }
        })
        .catch(console.log)
        }
    }

}