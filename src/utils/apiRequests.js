import axios from 'axios';

const URL = 'http://localhost:5000';

const getAuthToken = () => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        return `Bearer ${authToken.replace(/"/g,"")}`
    }
    return '';
}

// GET or POST requests (or PATCH for updating scores)
const apiRequest = (endpoint, method, data, handleData, handleError) => {
    axios({
        method,
        url: `${URL}/${endpoint}`, 
        data,
        headers: {
            'Authorization': getAuthToken()
        }
    })
    .then(res => { 
        handleData(res.data)
    })
    .catch(e => handleError(e))
}

// PATCH or DELETE request that requires id of document
const idApiRequest = (endpoint, id, method, data, handleData, handleError) => {
    axios({
        method,
        url: `${URL}/${endpoint}/${id}`,
        data,
        headers: {
            'Authorization': getAuthToken()
        }
    })
    .then(res => { 
        handleData(res.data)
    })
    .catch(e => handleError(e))
}

export {
    apiRequest,
    idApiRequest,
}