import React, { useState, createContext } from 'react';
import { TagType } from '../types';

type CurrentTagContextType = {
  currentTag: TagType;
  setCurrentTag: React.Dispatch<React.SetStateAction<TagType>>;
};

export const CurrentTagContext = createContext<CurrentTagContextType>({
  currentTag: void 0,
  setCurrentTag: () => {},
});

type CurrentTagProviderProps = {
  children: React.ReactNode;
};

export const CurrentTagProvider: React.FC<CurrentTagProviderProps> = ({ children }) => {
  const [currentTag, setCurrentTag] = useState<TagType | undefined>(void 0);
  return <CurrentTagContext.Provider value={{ currentTag, setCurrentTag }}>{children}</CurrentTagContext.Provider>;
};
