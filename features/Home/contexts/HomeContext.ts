import { createContext } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

// えーと。spaceAndMeRelationshipとsetSpaceAndMeRekationshipだよね。とりあえず、contextに流したいのは。
type SpaceType = {
  _id: string;
  name: string;
  icon: string;
  isPublic: boolean;
};

type SpaceAndMeRelationshipType = {
  _id: string;
  space: SpaceType;
  user: string;
  createdAt: Date;
};

type HomeContextProps = {
  spaceAndMeRelationships: SpaceAndMeRelationshipType[];
  setSpaceAndMeRelationships: React.Dispatch<React.SetStateAction<SpaceAndMeRelationshipType[]>>;
  navigation: NavigationProp<ParamListBase> | undefined;
};

export const HomeContext = createContext<HomeContextProps>({
  spaceAndMeRelationships: [],
  setSpaceAndMeRelationships: () => {},
  navigation: undefined,
});
