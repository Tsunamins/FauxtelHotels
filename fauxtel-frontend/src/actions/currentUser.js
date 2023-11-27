export const loginUser = (user) => {
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
                    // alert(response.error)

                } else {
                    console.log(response)
                    console.log(response.data)
                    console.log(response.user.data)
                    console.log(response.jwt)
                    dispatch(loginUser(response.user.data))
                    localStorage.setItem('token', response.jwt)
                }
            })
            .catch(console.log)
    }
}

export const getCurrentUser = () => {
    //new
    return dispatch => {
        const token = localStorage.getItem("token")
        if (token) {

            return fetch("http://localhost:3000/api/v1/get_current_user", {

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
        console.log(credentials)
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
                    console.log(response)
                    console.log(response.user.data)
                    console.log(response.jwt)
                    dispatch(loginUser(response.user.data))
                    localStorage.setItem('token', response.jwt)
                }
            })
            .catch(console.log)
    }
}

export const logout = (event) => {
    localStorage.removeItem("token")
    console.log(localStorage.token)
    console.log("logged out")
    event.preventDefault()
    return dispatch => {
        dispatch(logoutUser())

    }
}
