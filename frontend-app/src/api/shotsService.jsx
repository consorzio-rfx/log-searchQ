import axios from "axios";

const API_URL = 'http://localhost:8081/logbook/shots';

const getShots = (Run, page, pageSize) => {
    if (Run !== null && Run !== undefined) {
        return axios.get(API_URL, {
            params: {
                Run: Run,
                page: page,
                pageSize: pageSize,
            }
        });
    }

    return axios.get(API_URL, {
        params: {
            page: page,
            pageSize: pageSize,
        }
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
  