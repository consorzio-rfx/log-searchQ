// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import keycloak from './keycloak'

const KeycloakAuthContext = createContext();

export const useKeycloakAuthContext = () => useContext(KeycloakAuthContext);

export const KeycloakAuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
      keycloak.initPromise
          .then(authenticated => {
              setAuthenticated(authenticated);
              if (authenticated) {
                keycloak.loadUserInfo().then((user) => {
                  setUserInfo(user);
                });
              }
          })
          .catch(error => {
              console.error("Keycloak initialization failed", error);
          });
  }, []);

  return (
    <KeycloakAuthContext.Provider value={{ authenticated, userInfo, keycloak }}>
      {children}
    </KeycloakAuthContext.Provider>
  );
};
