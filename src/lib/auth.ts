import { createAuth0Client } from '@auth0/auth0-spa-js';

export const auth0Config = {
  domain: "dev-pnek8z7lt6ff7mie.us.auth0.com",
  clientId: "DFRKibuc7US1EZTxb8PKafc1thQhDcBi",
  authorizationParams: {
    redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
  }
};

export const initAuth0 = async () => {
  return await createAuth0Client(auth0Config);
};
