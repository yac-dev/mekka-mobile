import React, { useState, createContext } from 'react';
import { SpaceUpdatesType } from '../types';

type SpaceUpdatesContextType = {
  spaceUpdates: SpaceUpdatesType;
  setSpaceUpdates: React.Dispatch<React.SetStateAction<SpaceUpdatesType>>;
};

export const SpaceUpdatesContext = createContext<SpaceUpdatesContextType>({
  spaceUpdates: void 0, //初期はシンプルにundefinedでいく。
  setSpaceUpdates: () => {},
});

type SpaceUpdatesProviderProps = {
  children: React.ReactNode;
};

export const SpaceUpdatesProvider: React.FC<SpaceUpdatesProviderProps> = ({ children }) => {
  const [spaceUpdates, setSpaceUpdates] = useState<SpaceUpdatesType | undefined>(void 0);
  return (
    <SpaceUpdatesContext.Provider value={{ spaceUpdates, setSpaceUpdates }}>{children}</SpaceUpdatesContext.Provider>
  );
};
