import React, { useState, createContext } from 'react';
import { SpaceAndUserRelationshipType, SpaceType } from '../types';

type CurrentSpaceContextType = {
  currentSpace: SpaceType;
  setCurrentSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
};

export const CurrentSpaceContext = createContext<CurrentSpaceContextType>({
  currentSpace: void 0,
  setCurrentSpace: () => {},
});

type CurrentSpaceProviderProps = {
  children: React.ReactNode;
};

export const CurrentSpaceProvider: React.FC<CurrentSpaceProviderProps> = ({ children }) => {
  const [currentSpace, setCurrentSpace] = useState<SpaceType | undefined>(void 0);
  return (
    <CurrentSpaceContext.Provider value={{ currentSpace, setCurrentSpace }}>{children}</CurrentSpaceContext.Provider>
  );
};
