export const getRooms = async () => {
    let data;
    try {
        const response = await fetch('http://localhost:3003/api/v1/rooms')
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

export const getRoom = async (id) => {
    let data;
    try {
        const response = await fetch(`http://localhost:3003/api/v1/rooms${id}`)
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