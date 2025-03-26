import axios from "axios";
import API_ENDPOINTS from "./config";

const API_URL = API_ENDPOINTS.datafusionEndpoint + '/api/executeQuery';

const selectQuery = (queryName) => {
    return axios.get(API_URL + "/selectQuery", { params: { queryName: queryName } })
}

const getValidParams = (searchedShots) => {
    const shotList = searchedShots["shots"]
    ? searchedShots["shots"].split(',').map(num => parseInt(num.trim()))
    : undefined;

    const params = {
        shots: shotList,
        run: searchedShots["run"],
        pre_brief: searchedShots["pre_brief"],
        post_brief: searchedShots["post_brief"],
        pre_keywords: searchedShots["pre_keywords"],
        post_keywords: searchedShots["post_keywords"]
    };

    // Remove keys with `null`, `undefined`, or empty strings
    const validParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null && value !== undefined && value !== "")
    );

    return validParams
}

const searchShots = (searchedShots) => {
    return axios.get(API_URL + "/searchShots", { params: getValidParams(searchedShots) });
}

const execute = (queryName, searchedShots) => {
    return axios.post(API_URL + "/execute", null, { params: { js: 1, queryName: queryName, ...getValidParams(searchedShots) } })
}


const executeQueryService = {
    selectQuery, 
    searchShots,
    execute,
}

export default executeQueryService;