import axios from "axios";
import API_ENDPOINTS from "./config";

const API_URL = API_ENDPOINTS.logbookBackendEndpoint + '/logbook/shots';

const getShots = (Run, page, pageSize, keycloak) => {
    if (Run !== null && Run !== undefined) {
        return axios.get(API_URL, {
            params: {
                Run: Run,
                page: page,
                pageSize: pageSize,
            },

            headers: { Authorization: `Bearer ${keycloak.token}` },
        });
    }

    return axios.get(API_URL, {
        params: {
            page: page,
            pageSize: pageSize,
        },
        
        headers: { Authorization: `Bearer ${keycloak.token}` },
    });
}

const getAllShots = () => {
    return axios.get(API_URL);
};

const createShot = (shot) => {
    return axios.post(API_URL, shot)
}

const updateShot = (shot) => {
    return axios.put(API_URL + "/" + shot.Shot, shot)
}

const deleteShot = (shot) => {
    return axios.delete(API_URL + "/" + shot.Shot)
}


const shotsService = {
    getShots,
    getAllShots,
    createShot,
    updateShot,
    deleteShot,
}

export default shotsService;
  