import axios from "axios";

const API_URL = 'http://localhost:8080/logbook/runs';

const getAllRuns = () => {
    return axios.get(API_URL);
};

const runsService = {
    getAllRuns,
}

export default runsService;
  