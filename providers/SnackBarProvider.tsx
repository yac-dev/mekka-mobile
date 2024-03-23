import React, { useState, createContext } from 'react';
import { SnackBarType, INITIAL_SNACK_BAR } from '../types';

type SnackBarContextType = {
  snackBar: SnackBarType;
  setSnackBar: React.Dispatch<React.SetStateAction<SnackBarType>>;
};

export const SnackBarContext = createContext<SnackBarContextType>({
  snackBar: void 0,
  setSnackBar: () => {},
});

type SnackBarProviderProps = {
  children: React.ReactNode;
};

// ここでstateを持っておくのはよくて、、、
export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({ children }) => {
  const [snackBar, setSnackBar] = useState<SnackBarType>(INITIAL_SNACK_BAR);
  return <SnackBarContext.Provider value={{ snackBar, setSnackBar }}>{children}</SnackBarContext.Provider>;
};
