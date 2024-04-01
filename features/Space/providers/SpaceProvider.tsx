import React, { useState, createContext } from 'react';
import { SpaceType } from '../../../types';

type SpaceContextType = {
  space?: SpaceType;
};

export const SpaceContext = createContext<SpaceContextType>({
  space: void 0,
});

type SpaceProviderProps = {
  children: React.ReactNode;
};

export const MySpacesProvider: React.FC<SpaceProviderProps> = ({ children }) => {
  const [space, setSpace] = useState<SpaceType | undefined>(void 0);
  return <SpaceContext.Provider value={{ space }}>{children}</SpaceContext.Provider>;
};
