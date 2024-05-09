import React, { useState, createContext } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type GlobaleContextType = {
  appState: AppStateStatus;
  onAppStateChange: (nextAppState: AppStateStatus) => void;
};

export const GlobalContext = createContext<GlobaleContextType>({
  appState: void 0,
  onAppStateChange: () => {},
});

type GlobalProviderProps = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState(AppState.currentState);

  const onAppStateChange = (nextAppState: AppStateStatus) => {
    setAppState(nextAppState);
  };

  return <GlobalContext.Provider value={{ appState, onAppStateChange }}>{children}</GlobalContext.Provider>;
};
