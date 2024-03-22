export const loginUser = (user) => {
    return {
        type: "LOGIN_USER",
        user
    };
};

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER"
    };
};

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
                    // alert(response.error);
                } else {
                    localStorage.setItem('token', response.jwt)
                    dispatch(loginUser(response.user.data));
                    
                }
            })
            .catch(console.log);
    };
}

export const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    return dispatch => {
         fetch("http://localhost:3000/api/v1/get_current_user", {
                headers: {
                    "Authorization": `${token}`
                },
            })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error) {
                        console.log('error in get user: ', response.error)
                    } else {
                        dispatch(loginUser(response.user.data))
                    }
                })
                .catch(console.log)
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

export const logout = () => {
    return dispatch => {
        dispatch(logoutUser())
    }
}
