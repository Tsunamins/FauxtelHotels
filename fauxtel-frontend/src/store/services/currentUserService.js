import { logoutUser } from "../actions/currentUser";

export const login = (credentials) => {
    return dispatch => {
        fetch('http://localhost:3003/api/v1/login', {
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

// todo work with signup and login next for the new slice
export const signup = (credentials) => {
    return dispatch => {
        const userInfo = {
            user: credentials // added bc has to be wrapped in user object
        }
        return fetch("http://localhost:3003/api/v1/signup", {
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

// export const logout = () => {
//     return dispatch => {
//         dispatch(logoutUser())
//     }
// }

export const loginUser = async (credentials) => {
    let data;
    try {
        const response = await fetch('http://localhost:3003/api/v1/login',
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(credentials)
        })
        data = await response.json();
        if (response.ok){
            return {
                status: response.status,
                data,
                headers: response.headers,
                url: response.url
            }
        }
        throw new Error(response.statusText)
    } catch (error) {
        return Promise.reject(error.message ? error.message : data)
    }
};

export const getCurrentUser = async (credentials) => {
    let data;
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3003/api/v1/get_current_user', {
            headers: {
                "Authorization": `${token}`
            },
        })
        data = await response.json();
        if (response.ok){
            return {
                status: response.status,
                data,
                headers: response.headers,
                url: response.url
            }
        }
        throw new Error(response.statusText)
    } catch (error) {
        return Promise.reject(error.message ? error.message : data)
    }
};

