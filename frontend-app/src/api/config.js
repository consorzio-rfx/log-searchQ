const API_ENDPOINTS = {
    keycloakEndpoint: process.env.REACT_APP_KEYCLOAK_ENDPOINT || 'http://localhost:8080',
    logbookBackendEndpoint: process.env.REACT_APP_LOGBOOK_BACKEND_ENDPOINT || 'http://localhost:8081',
    datafusionEndpoint: process.env.REACT_APP_DATAFUSION_ENDPOINT || 'http://localhost:5001',
};
  
export default API_ENDPOINTS;