import { createContext, RefObject } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type SpaceType = {
  name: string;
};

type LocationType = {
  type: string;
  coordinates: number[];
};

type ContentType = {
  _id: string;
  data: string;
  type: string;
  createdBy: string;
  createdAt: string;
};

type PostType = {
  _id: string;
  location: LocationType;
  contents: ContentType[];
  caption: string;
  spaceId: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
};

type VideoSpaceContextType = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  arePostsFetched: boolean;
  setArePostsFetched: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationProp<ParamListBase> | undefined;
  menuBottomSheetRef: RefObject<null> | null;
};

export const VideoSpaceContext = createContext<VideoSpaceContextType>({
  space: {
    name: '',
  },
  setSpace: () => {},
  posts: [],
  setPosts: () => {},
  arePostsFetched: false,
  setArePostsFetched: () => {},
  navigation: undefined,
  menuBottomSheetRef: null,
});
