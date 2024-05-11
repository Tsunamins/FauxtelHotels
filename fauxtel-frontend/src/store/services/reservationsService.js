import { addReservation, deleteReservation, setAllReservations, updateReservation } from "../actions/reservations";


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
    console.log('resInfo in the service???? ', resInfo)
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

export const cancelReservation = (res_id) => {
    const token = localStorage.getItem("token")
    if (token) {
        return dispatch => {
            return fetch(`http://localhost:3003/api/v1/reservations/${res_id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            })
                .then(resp => {
                    if (resp.error) {
                    } else {
                        dispatch(deleteReservation(res_id));
                    }
                })
                .catch(error => console.log(error));
        }
    };
};

export const modifyReservation = (resv_id, resv_data) => {
    const token = localStorage.getItem("token");
    if (token) {
        return dispatch => {
            return fetch(`http://localhost:3003/api/v1/reservations/${resv_id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resv_data)
            })
                .then(resp => resp.json())
                .then(response => {
                    if (response.error) {

                    } else {
                        console.log(response.data);
                        dispatch(updateReservation(response.data));
                    }
                })
                .catch(error => console.log(error));
        }
    };
};