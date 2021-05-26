import axios from 'axios';

const URL = 'https://eras-api-djig9uqfe22ss4.herokuapp.com';

const getAuthToken = () => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        return `Bearer ${authToken.replace(/"/g,"")}`
    }
    return '';
}

// GET or POST requests (or PATCH for updating scores)
const apiRequest = async (endpoint, method, data, handleData, handleError) => {
    try {
        const res = await axios({
            method,
            url: `${URL}/${endpoint}`, 
            data,
            headers: {
                'Authorization': getAuthToken()
            }
        });
        handleData(res.data);
    } catch (e) {
        if (e.response) {
            handleError(e.response.data);
        } else if (e.message) {
            handleError(e.message);
        }
    }
}

// PATCH or DELETE request that requires id of document
const idApiRequest = async (endpoint, id, method, data, handleData, handleError) => {
    try {
        const res = await axios({
            method,
            url: `${URL}/${endpoint}/${id}`,
            data,
            headers: {
                'Authorization': getAuthToken()
            }
        });
        handleData(res.data);
    } catch (e) {
        if (e.response) {
            handleError(e.response.data);
        } else if (e.message) {
            handleError(e.message);
        }
    }
}

export {
    apiRequest,
    idApiRequest
}