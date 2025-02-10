import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  AuthResponse,
  SignInPage,
  type AuthProvider,
} from '@toolpad/core/SignInPage';
import { Dialog } from '@mui/material';
import { useKeycloakAuthContext } from './KeycloakAuthContext';

const providers = [
  { id: 'credentials', name: 'Email and Password' },
  { id: 'google', name: 'Google' },
  { id: 'keycloak', name: 'Keycloak' },
];

export default function OAuthSignInPage({open, onClose}) {
  const { authenticated, keycloak } = useKeycloakAuthContext();

  const signIn: (provider: AuthProvider) => void | Promise<AuthResponse> = async (
    provider) => {
    const promise = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        console.log(`Sign in with ${provider.id}`);
        resolve({ error: 'This is a fake error' });
      }, 500);
    });

    if (provider.id === 'keycloak') {
      keycloak.login()
    }

    return promise;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <AppProvider>
        <SignInPage signIn={signIn} providers={providers} />
      </AppProvider>
    </Dialog>
  );
}
