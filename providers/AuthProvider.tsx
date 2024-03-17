import React, { useState, createContext } from 'react';
import { AuthType } from '../types';

type AuthContextType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
};

export const AuthContext = createContext<AuthContextType>({
  auth: void 0, //初期はシンプルにundefinedでいく。
  setAuth: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthType | undefined>(void 0);
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
