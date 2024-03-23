import React, { useState, createContext } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type AppStateContextType = {
  appState: AppStateStatus;
  setAppState: React.Dispatch<React.SetStateAction<AppStateStatus>>;
};

export const AppStateContext = createContext<AppStateContextType>({
  appState: AppState.currentState,
  setAppState: () => {},
});

type AppStateProviderProps = {
  children: React.ReactNode;
};

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  return <AppStateContext.Provider value={{ appState, setAppState }}>{children}</AppStateContext.Provider>;
};
