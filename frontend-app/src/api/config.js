
// require('dotenv').config();

const domain_name = process.env.REACT_APP_DOMAIN_NAME ||"https://logbook.mildstone.org";
const API_ENDPOINTS = {
    keycloakEndpoint: process.env.REACT_APP_KEYCLOAK_ENDPOINT || domain_name + '/auth',
    logbookBackendEndpoint: process.env.REACT_APP_LOGBOOK_BACKEND_ENDPOINT || domain_name + '/logbook',
    // logbookBackendEndpoint: "http://localhost:8081/logbook",
    queryEngineEndpoint: process.env.REACT_APP_QUERY_ENGINE_ENDPOINT || domain_name + '/query-engine',
};


export default API_ENDPOINTS;