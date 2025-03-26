import Keycloak from 'keycloak-js';
import API_ENDPOINTS from '../../api/config';

const keycloak = new Keycloak({
    url: API_ENDPOINTS.logbookBackendEndpoint,
    realm: 'myrealm',
    clientId: 'frontend-client',
});

// Store the initialization promise to ensure it's only called once
keycloak.initPromise = keycloak.init({ onLoad: 'check-sso' });

export default keycloak;
