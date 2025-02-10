import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  AuthResponse,
  SignInPage,
  type AuthProvider,
} from '@toolpad/core/SignInPage';
import { Dialog } from '@mui/material';

// preview-start
const providers = [
  { id: 'credentials', name: 'Email and Password' },
  { id: 'google', name: 'Google' },
  { id: 'keycloak', name: 'Keycloak' },
];
// preview-end

const signIn: (provider: AuthProvider) => void | Promise<AuthResponse> = async (
  provider,
) => {
  // preview-start
  const promise = new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve({ error: 'This is a fake error' });
    }, 500);
  });
  // preview-end
  return promise;
};

export default function OAuthSignInPage({open, onClose}) {
  return (

    <Dialog open={open} onClose={onClose}>
    
    {/* preview-start */}
    <AppProvider>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
    {/* preview-end */}

    </Dialog>

  );
}
