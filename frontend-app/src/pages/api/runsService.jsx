import axios from "axios";

const API_URL = 'http://localhost:8080/logbook/runs';

const getAllRuns = () => {
    return axios.get(API_URL);
};

const updateRun = (run) => {
    return axios.put(API_URL + "/" + run.Run, run)
}

const deleteRun = (run) => {
    return axios.delete(API_URL + "/" + run.Run)
}


const runsService = {
    getAllRuns,
    updateRun,
    deleteRun,
}

export default runsService;
  