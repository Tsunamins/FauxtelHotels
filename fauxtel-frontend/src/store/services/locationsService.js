export const getLocations = async () => {
    let data;
    try {
        const response = await fetch('http://localhost:3003/api/v1/locations')
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