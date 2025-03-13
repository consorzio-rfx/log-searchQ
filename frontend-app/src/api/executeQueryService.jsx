import axios from "axios";

const API_URL = 'http://localhost:5001/api/executeQuery';

const selectQuery = (queryName) => {
    return axios.get(API_URL + "/selectQuery", { params: { queryName: queryName } })
}

const searchShots = (shots) => {
    const shotList = shots.split(',').map(num => parseInt(num.trim()));
    return axios.get(API_URL + "/searchShots", { params: { shots: shotList } })
}


const executeQueryService = {
    selectQuery, 
    searchShots,
}

export default executeQueryService;