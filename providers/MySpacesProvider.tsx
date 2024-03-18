import React, { useState, createContext } from 'react';
import { SpaceAndUserRelationshipType } from '../types';

type MySpacesContextType = {
  mySpaces: SpaceAndUserRelationshipType[];
  setMySpaces: React.Dispatch<React.SetStateAction<SpaceAndUserRelationshipType[]>>;
};

export const MySpacesContext = createContext<MySpacesContextType>({
  mySpaces: [], //初期はシンプルにundefinedでいく。
  setMySpaces: () => {},
});

type MySpacesProviderProps = {
  children: React.ReactNode;
};

export const MySpacesProvider: React.FC<MySpacesProviderProps> = ({ children }) => {
  const [mySpaces, setMySpaces] = useState<SpaceAndUserRelationshipType[] | undefined>(void 0);
  return <MySpacesContext.Provider value={{ mySpaces, setMySpaces }}>{children}</MySpacesContext.Provider>;
};
