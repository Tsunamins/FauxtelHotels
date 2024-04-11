export const getRoom = (room_id) => {
    return dispatch => {
        return fetch(`http://localhost:3003/api/v1/rooms/${room_id}`)
            .then(resp => resp.json())
            .then(response => {
                if (response.error) {
                    alert(response.error);
                    console.log('room error??? ', response.error)
                } else {;
                    console.log('room response??? ', response)
                    dispatch(buildReservation(response))
                }
            })
            .catch(console.log);
    };
};

export const getResv = (res_id) => {
    return dispatch => {
        return fetch(`http://localhost:3003/api/v1/reservations/${res_id}`)
            .then(resp => resp.json())
            .then(response => {
                if (response.error) {
                    alert(response.error);
                } else {

                    dispatch(modifyReservation(response.data))
                };
            })
            .catch(console.log);
    };
};

export const getUserReservations = (user_id) => {
    return dispatch => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3003/api/v1/users/${user_id}`, {
            headers: {
                "Authorization": token
            }
        })
            .then(resp => resp.json())
            .then(response => {
                if (response.error) {
                    alert("Not authorized - user reservations");
                } else {
                    dispatch(setUserReservations(response.data.attributes.reservations));
                }
            })
            .catch(console.log)
    };
}
