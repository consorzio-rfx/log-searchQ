import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'myrealm',
    clientId: 'frontend-client',
});

// Store the initialization promise to ensure it's only called once
keycloak.initPromise = keycloak.init({ onLoad: 'check-sso' });

export default keycloak;
