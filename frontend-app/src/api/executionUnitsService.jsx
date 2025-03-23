import axios from "axios";

const API_URL = 'http://localhost:5001/executionUnits';

const getAllExecutionUnits = () => {
    return axios.get(API_URL);
};

const deleteExecutionUnit = (executionUnit) => {
    return axios.delete(API_URL + "/" + executionUnit.id)
}

const executionUnitsService = {
    getAllExecutionUnits,
    deleteExecutionUnit,
}

export default executionUnitsService;