import axios from "axios";

const API_URL = 'http://localhost:5001/queries';

const getAllQueries = () => {
    return axios.get(API_URL);
};

const queriesService = {
    getAllQueries,
}

export default queriesService;