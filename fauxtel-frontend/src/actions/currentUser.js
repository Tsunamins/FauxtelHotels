import { resetLoginForm } from "./loginForm.js"


export const setCurrentUser = user => {
    
    return {
        type: "SET_CURRENT_USER",
       
        user,
       
        
    }
    
}

export const clearCurrentUser = () => {
    return {
      type: "CLEAR_CURRENT_USER"
    }
  }

export const login = credentials => {
   
    return dispatch => {

        fetch('http://localhost:3000/api/v1/login', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(credentials)
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.error){
                alert(resp.error)
                
            } else {
                console.log(resp)
                console.log(resp.data)
                console.log(resp.user.data)
                console.log(resp.jwt)
                dispatch(setCurrentUser(resp.user.data))
                localStorage.setItem('token', resp.jwt)
                dispatch(resetLoginForm())
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
          "Authorization": token
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