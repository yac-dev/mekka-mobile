import React, { useState, createContext, useEffect, useRef, useContext } from 'react';
import { AppState } from 'react-native';
import { SpaceType, TagType, ApiStatusType, PostType, ApiResultType, MapRegionType } from '../../../types';
import { GetPostsByTagIdAndRegionOutput, GetPostsOutputType } from '../types';
import { useGetPosts } from '../hooks';
import * as Haptics from 'expo-haptics';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
import MapView, { Region } from 'react-native-maps';
import { CurrentSpaceContext, GlobalContext } from '../../../providers';

type TagScreenContextType = {
  tag?: TagType;
  mapRef: React.MutableRefObject<MapView | null>;
  region: MapRegionType;
  onRegionChangeComplete: (region: Region) => void;
  getPostsApiResult: ApiResultType<GetPostsOutputType>;
  getPostsByTagIdAndRegionResult: ApiResultType<GetPostsByTagIdAndRegionOutput>;
  addCreatedPost: (createdPost: PostType) => void;
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
  tag: void 0,
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
  addCreatedPost: () => {},
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
  const { appState } = useContext(GlobalContext);
  const { currentSpace } = useContext(CurrentSpaceContext);
  const {
    apiResult: getPostsApiResult,
    requestApi: requestGetPostsApi,
    addCreatedPost,
    requestRefresh,
  } = useGetPosts();
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
  // このscreen loadedをな。。。

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

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        requestRefresh({ tagId: tag._id, currentPage: 0 });
        console.log('refreshig');
      } else if (appState === 'active' && nextAppState === 'inactive') {
        // console.log('Became inactive...');
      }
      // console.log('Next AppState is: ', nextAppState);
    });

    return () => {
      appStateListener.remove();
    };
  }, [appState]);

  return (
    <TagScreenContext.Provider
      value={{
        tag,
        mapRef,
        region,
        onRegionChangeComplete,
        getPostsApiResult,
        getPostsByTagIdAndRegionResult,
        addCreatedPost,
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
