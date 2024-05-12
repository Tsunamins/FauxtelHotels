export const createUser = async (userInfo) => {
    let data;
    try {
        const response = await fetch('http://localhost:3003/api/v1/signup',
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(userInfo)
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

