export const setLocs = (locs) => {
    return {
        type: "GET_LOCS",
        locs
    };
};

export const getLocs = () => {
    return dispatch => {
        return fetch('http://localhost:3000/api/v1/locations')
            .then(resp => resp.json())
            .then(response => {
                if (response.error) {
                    // alert(response.error);
                } else {
                    dispatch(setLocs(response.data));
                }
            })
            .catch(console.log);
    };
};

