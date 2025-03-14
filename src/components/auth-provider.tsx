"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { Auth0Client, User } from '@auth0/auth0-spa-js';
import { initAuth0 } from '@/lib/auth';

// Auth context provides these functions and states
interface AuthContextType {
  auth0Client: Auth0Client | null;
  isAuthenticated: boolean; // Tracks if user is logged in
  user: User | null;       // Stores user profile data
  loading: boolean;        // Loading state
  login: () => Promise<void>;  // Login function
  logout: () => Promise<void>; // Logout function
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth0Client, setAuth0Client] = useState<Auth0Client | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const client = await initAuth0();
      setAuth0Client(client);

      if (location.search.includes("state=") && 
          (location.search.includes("code=") || 
          location.search.includes("error="))) {
        await client.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
      }

      const authenticated = await client.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const userProfile = await client.getUser();
        setUser(userProfile ?? null);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async () => {
    if (auth0Client) {
      await auth0Client.loginWithRedirect();
    }
  };

  const logout = async () => {
    if (auth0Client) {
      await auth0Client.logout();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      auth0Client, 
      isAuthenticated, 
      user, 
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
