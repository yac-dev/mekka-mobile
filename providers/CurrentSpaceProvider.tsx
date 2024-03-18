import React, { useState, createContext } from 'react';
import { SpaceAndUserRelationshipType } from '../types';

type CurrentSpaceContextType = {
  currentSpace: SpaceAndUserRelationshipType;
  setCurrentSpace: React.Dispatch<React.SetStateAction<SpaceAndUserRelationshipType>>;
};

export const CurrentSpaceContext = createContext<CurrentSpaceContextType>({
  currentSpace: void 0,
  setCurrentSpace: () => {},
});

type CurrentSpaceProviderProps = {
  children: React.ReactNode;
};

export const CurrentSpaceProvider: React.FC<CurrentSpaceProviderProps> = ({ children }) => {
  const [currentSpace, setCurrentSpace] = useState<SpaceAndUserRelationshipType | undefined>(void 0);
  return (
    <CurrentSpaceContext.Provider value={{ currentSpace, setCurrentSpace }}>{children}</CurrentSpaceContext.Provider>
  );
};
