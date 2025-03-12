import axios from "axios";

const API_URL = 'http://localhost:5001/queries';

const getAllQueries = () => {
    return axios.get(API_URL);
};

const createQuery = (query) => {
    return axios.post(API_URL, query)
}

const updateQuery = (query) => {
    return axios.put(API_URL + "/" + query.id, query)
}

const deleteQuery = (query) => {
    return axios.delete(API_URL + "/" + query.id)
}


const queriesService = {
    getAllQueries,
    createQuery,
    updateQuery,
    deleteQuery,
}

export default queriesService;