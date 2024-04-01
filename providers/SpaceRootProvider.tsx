import React, { useState, createContext } from 'react';
import { SpaceType } from '../types';

type SpaceRootContextType = {
  mySpaces: SpaceType[];
  setMySpaces: React.Dispatch<React.SetStateAction<SpaceType[]>>;
};

export const MySpacesContext = createContext<MySpacesContextType>({
  mySpaces: [], //初期はシンプルにundefinedでいく。
  setMySpaces: () => {},
});

type MySpacesProviderProps = {
  children: React.ReactNode;
};

export const MySpacesProvider: React.FC<MySpacesProviderProps> = ({ children }) => {
  const [mySpaces, setMySpaces] = useState<SpaceType[] | undefined>(void 0);
  return <MySpacesContext.Provider value={{ mySpaces, setMySpaces }}>{children}</MySpacesContext.Provider>;
};
