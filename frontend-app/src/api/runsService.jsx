import axios from "axios";
import API_ENDPOINTS from "./config";

const API_URL = API_ENDPOINTS.logbookBackendEndpoint + '/runs';

const getRuns = (page, pageSize, keycloak) => {
    return axios.get(API_URL, {
        params: {
            page: page,
            pageSize: pageSize,
        }, 

        headers: { Authorization: `Bearer ${keycloak.token}` },
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
  