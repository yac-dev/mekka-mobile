import React, { useState, createContext } from 'react';
import { SpaceUpdatesType } from '../types';

type AuthContextType = {
  updates: SpaceUpdatesType;
  setUpdates: React.Dispatch<React.SetStateAction<SpaceUpdatesType>>;
};

export const UpdatesContext = createContext<AuthContextType>({
  updates: void 0, //初期はシンプルにundefinedでいく。
  setUpdates: () => {},
});

type UpdatesProviderProps = {
  children: React.ReactNode;
};

export const UpdatedsProvider: React.FC<UpdatesProviderProps> = ({ children }) => {
  const [updates, setUpdates] = useState<SpaceUpdatesType | undefined>(void 0);
  return <UpdatesContext.Provider value={{ updates, setUpdates }}>{children}</UpdatesContext.Provider>;
};
