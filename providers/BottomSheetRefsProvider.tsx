import React, { useState, createContext, useRef } from 'react';
import { SnackBarType, INITIAL_SNACK_BAR } from '../types';
import FlashMessage from 'react-native-flash-message';

type SnackBarContextType = {
  snackBar: SnackBarType;
  setSnackBar: React.Dispatch<React.SetStateAction<SnackBarType>>;
  // flashMessageRef: React.RefObject<FlashMessage>;
};

export const SnackBarContext = createContext<SnackBarContextType>({
  snackBar: void 0,
  setSnackBar: () => {},
  // flashMessageRef: null,
});

type SnackBarProviderProps = {
  children: React.ReactNode;
};

// ここでstateを持っておくのはよくて、、、
export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({ children }) => {
  const flashMessageRef = useRef<FlashMessage>(null);
  const [snackBar, setSnackBar] = useState<SnackBarType>(INITIAL_SNACK_BAR);
  return (
    <SnackBarContext.Provider
      value={{
        snackBar,
        setSnackBar,
        // flashMessageRef
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};
