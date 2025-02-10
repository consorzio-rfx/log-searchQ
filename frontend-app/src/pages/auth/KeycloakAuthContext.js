// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import keycloak from './keycloak'

const KeycloakAuthContext = createContext();

export const useKeycloakAuthContext = () => useContext(KeycloakAuthContext);

export const KeycloakAuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
      keycloak.initPromise
          .then(authenticated => {
              setAuthenticated(authenticated);
          })
          .catch(error => {
              console.error("Keycloak initialization failed", error);
          });
  }, []);

  return (
    <KeycloakAuthContext.Provider value={{ authenticated, keycloak }}>
      {children}
    </KeycloakAuthContext.Provider>
  );
};
