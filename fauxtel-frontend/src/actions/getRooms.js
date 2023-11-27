export const setRooms = (rooms) => {
    return {
        type: "GET_ROOMS",
        rooms
    }
}

export const getRooms = () => {
    return dispatch => {
        return fetch('http://localhost:3000/api/v1/rooms')
            .then(resp => resp.json())
            .then(response => {
                if (response.error) {
                    console.log('resp error rooms: ', response.error)
                    // alert(response.error)
                } else {
                    console.log("dispatch rooms")
                    //console.log(response)
                    dispatch(setRooms(response.data))
                }
            })
            .catch(console.log)
    }
}
