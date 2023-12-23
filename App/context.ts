import React, { createContext } from 'react';

type AuthDataType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

type GlobalContextProps = {
  authData: AuthDataType;
  setAuthData: React.Dispatch<React.SetStateAction<AuthDataType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isIpad: boolean;
  setIsIpad: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  snackBar: boolean;
  setSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextProps>({
  authData: { _id: '', name: '', email: '', avatar: '' },
  setAuthData: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isIpad: false,
  setIsIpad: () => {},
  loading: false,
  setLoading: () => {},
  snackBar: false,
  setSnackBar: () => {},
});
