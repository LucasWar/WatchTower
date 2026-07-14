"use client";

import { disconnectSocket, getSocket } from '@/config/socket';
import { AuthService } from '@/services/auth';


import { useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';

interface AuthContextValues {
  token: string | null;
  signedIn: boolean;
  signin: (accesseToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext({} as AuthContextValues)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [signedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = AuthService.getAccessToken();
    setSignedIn(Boolean(accessToken));
    setToken(accessToken);

    if (accessToken) {
      getSocket().connect();
    }
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESSE_TOKEN_KEY!);
    queryClient.removeQueries();
    AuthService.Logout();
    disconnectSocket();
    setSignedIn(false);
  }, [queryClient]);

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(process.env.NEXT_PUBLIC_ACCESSE_TOKEN_KEY!, accessToken);
    setToken(accessToken);
    setSignedIn(true);
    getSocket().connect();
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin, token, signout }}>
      {children}
    </AuthContext.Provider>
  )
}