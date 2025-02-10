import axios from "axios";

const API_URL = 'http://localhost:8081/logbook/shots';

const getAllShots = () => {
    return axios.get(API_URL);
};

const updateShot = (shot) => {
    return axios.put(API_URL + "/" + shot.Shot, shot)
}

const deleteShot = (shot) => {
    return axios.delete(API_URL + "/" + shot.Shot)
}


const shotsService = {
    getAllShots,
    updateShot,
    deleteShot,
}

export default shotsService;
  