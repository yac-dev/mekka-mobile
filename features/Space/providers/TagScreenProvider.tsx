import React, { useState, createContext, useEffect, useRef } from 'react';
import { SpaceType, TagType, ApiStatusType, PostType, ApiResultType, MapRegionType } from '../../../types';
import { GetPostsByTagIdAndRegionOutput, GetPostsOutputType } from '../types';
import { useGetPosts } from '../hooks';
import * as Haptics from 'expo-haptics';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
import MapView, { Region } from 'react-native-maps';

type TagScreenContextType = {
  mapRef: React.MutableRefObject<MapView | null>;
  region: MapRegionType;
  onRegionChangeComplete: (region: Region) => void;
  getPostsApiResult: ApiResultType<GetPostsOutputType>;
  getPostsByTagIdAndRegionResult: ApiResultType<GetPostsByTagIdAndRegionOutput>;
  viewPostsType: ViewPostsType;
  setViewPostsType: React.Dispatch<React.SetStateAction<ViewPostsType>>;
  screenLoaded: boolean;
  setScreenLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  currentPost: PostType;
  setCurrentPost: React.Dispatch<React.SetStateAction<PostType>>;
  currentPostIndex: number;
  onCurrentPostIndexChange: (index: number) => void;
};

const initialApiResult = {
  status: 'idling',
  data: void 0,
  message: '',
};

const defaultRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 100.0922,
  longitudeDelta: 100.0421,
};

export const TagScreenContext = createContext<TagScreenContextType>({
  mapRef: null,
  onRegionChangeComplete: () => {},
  region: defaultRegion,
  getPostsApiResult: {
    status: 'idling',
    data: void 0,
    message: '',
  },
  getPostsByTagIdAndRegionResult: {
    status: 'idling',
    data: void 0,
    message: '',
  },
  viewPostsType: 'grid',
  setViewPostsType: () => {},
  screenLoaded: false,
  setScreenLoaded: () => {},
  currentPost: void 0,
  setCurrentPost: () => {},
  currentPostIndex: 0,
  onCurrentPostIndexChange: () => void 0,
});

export type ViewPostsType = 'grid' | 'map';

type TagScreenProviderType = {
  tag: TagType;
  children: React.ReactNode;
};

export const TagScreenProvider: React.FC<TagScreenProviderType> = ({ tag, children }) => {
  const { apiResult: getPostsApiResult, requestApi: requestGetPostsApi } = useGetPosts();
  const { apiResult: getPostsByTagIdAndRegionResult, requestApi: requestGetPostsByTagIdAndRegion } =
    useGetPostsByTagIdAndRegion();
  const [viewPostsType, setViewPostsType] = useState<ViewPostsType>('grid');
  const [screenLoaded, setScreenLoaded] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<PostType | undefined>(void 0);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 100.0922,
    longitudeDelta: 100.0421,
  });

  const onRegionChangeComplete = (region: Region) => {
    setRegion(region);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const onCurrentPostIndexChange = (index: number) => {
    setCurrentPostIndex(index);
  };

  useEffect(() => {
    requestGetPostsApi({ tagId: tag._id, currentPage: 0 });
  }, []);

  useEffect(() => {
    requestGetPostsByTagIdAndRegion({ tagId: tag._id, region });
  }, [region]);

  return (
    <TagScreenContext.Provider
      value={{
        mapRef,
        region,
        onRegionChangeComplete,
        getPostsApiResult,
        getPostsByTagIdAndRegionResult,
        viewPostsType,
        setViewPostsType,
        screenLoaded,
        setScreenLoaded,
        currentPost,
        setCurrentPost,
        currentPostIndex,
        onCurrentPostIndexChange,
      }}
    >
      {children}
    </TagScreenContext.Provider>
  );
};
