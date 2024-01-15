export const loginUser = (user) => {
    console.log('login user action obj: ', user)
    return {
        type: "LOGIN_USER",
        user
    }
}

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER"
    }
}

export const login = (credentials) => {
    console.log('@@@@!!!!!credentials: ', credentials)
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
            .then(response => {
                if (response.error) {
                    alert(response.error)

                } else {
                    console.log('!!!!! response: ', response)
                    console.log(response.data)
                    console.log(response.user.data)
                    console.log(response.jwt)
                    sessionStorage.setItem('token', response.jwt)
                    dispatch(loginUser(response.user.data))
                    
                }
            })
            .catch(console.log)
    }
}

export const getCurrentUser = () => {
    //new
    const token = sessionStorage.getItem("token");
    if (token) {
    return dispatch => {
         fetch("http://localhost:3000/api/v1/get_current_user", {
                headers: {
                    "Authorization": token
                },
            })
                .then(resp => resp.json())

                .then(response => {
                    if (response.error) {
                        // alert(response.error)
                    } else {
                        dispatch(loginUser(response.user.data))
                    }
                })
                .catch(console.log)
        }
    }

}

export const signup = (credentials) => {
    return dispatch => {
        const userInfo = {
            user: credentials // added bc has to be wrapped in user object
        }
        return fetch("http://localhost:3000/api/v1/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(resp => resp.json())
            .then(response => {
                if (response.error) {
                    // alert(response.error)
                } else {
                    dispatch(loginUser(response.user.data))
                    sessionStorage.setItem('token', response.jwt)
                }
            })
            .catch(console.log)
    }
}

export const logout = (event) => {
    sessionStorage.removeItem("token")
    return dispatch => {
        dispatch(logoutUser())

    }
}
