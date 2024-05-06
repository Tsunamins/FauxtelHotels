export const setRooms = (rooms) => {
    return {
        type: "GET_ROOMS",
        rooms
    };
};

export const getRooms = () => {
    return dispatch => {
        return fetch('http://localhost:3003/api/v1/rooms')
            .then(resp => resp.json())
            .then(response => {
                if (response.error) {
                    // alert(response.error);
                } else {
                    dispatch(setRooms(response.data));
                }
            })
            .catch(console.log);
    };
};
