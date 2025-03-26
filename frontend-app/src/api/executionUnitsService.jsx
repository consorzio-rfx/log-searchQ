import axios from "axios";
import API_ENDPOINTS from "./config";

const API_URL = API_ENDPOINTS.datafusionEndpoint + '/executionUnits';

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