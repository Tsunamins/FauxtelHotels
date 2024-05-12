export const getReservations = async () => {
    let data;
    try {
        const response = await fetch('http://localhost:3003/api/v1/reservations')
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

export const createReservation = async (resInfo) => {
    let data;
    try {
        const response = await fetch('http://localhost:3003/api/v1/reservations',
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(resInfo)
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

export const deleteReservation = async (resvID) => {
    let data;
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:3003/api/v1/reservations/${resvID}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
            },
            method: "DELETE",
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

export const patchReservation = async (resvID, resvData) => {
    let data;
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:3003/api/v1/reservations/${resvID}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
            method: "PUT",
            body: JSON.stringify(resvData)
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