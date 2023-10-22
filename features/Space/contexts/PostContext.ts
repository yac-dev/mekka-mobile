import { createContext, RefObject } from 'react';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';

type ContentType = {
  uri: string;
  type: string; // photo or video ここのliteral型かも書いた方がいいかもな。。。
  duration: number;
};

type LocationType = {
  type: string;
  coordinates: number[];
};

type FormType = {
  contents: ContentType[];
  caption: string;
  location: LocationType;
};

type FormContextType = {
  formData: FormType;
  setFormData: React.Dispatch<React.SetStateAction<FormType>>;
  navigation: NavigationProp<ParamListBase> | undefined;
  route: RouteProp<any, any> | undefined;
};

export const PostContext = createContext<FormContextType>({
  formData: {
    contents: [],
    caption: '',
    location: {
      type: 'Point',
      coordinates: [],
    },
  },
  setFormData: () => {},
  navigation: undefined,
  route: undefined,
});
