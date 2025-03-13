import axios from "axios";

const API_URL = 'http://localhost:5001/executionUnits';

const getAllExecutionUnits = () => {
    return axios.get(API_URL);
};

const executionUnitsService = {
    getAllExecutionUnits,
}

export default executionUnitsService;