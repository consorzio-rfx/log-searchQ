import axios from "axios";

const API_URL = 'http://localhost:8081/logbook/runs';

const getRuns = (page, pageSize) => {
    return axios.get(API_URL, {
        params: {
            page: page,
            pageSize: pageSize,
        }
    });
}

const getAllRuns = () => {
    return axios.get(API_URL);
};

const createRun = (run) => {
    return axios.post(API_URL, run)
}

const updateRun = (run) => {
    return axios.put(API_URL + "/" + run.Run, run)
}

const deleteRun = (run) => {
    return axios.delete(API_URL + "/" + run.Run)
}


const runsService = {
    getRuns,
    getAllRuns,
    createRun,
    updateRun,
    deleteRun,
}

export default runsService;
  