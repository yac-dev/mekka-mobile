import React, { useState, createContext, useEffect } from 'react';
import { SpaceType, TagType, ApiStatusType, PostType, ApiResultType } from '../../../types';
import { useGetTags } from '../hooks';
import { GetTagsOutputType } from '../types';

type SpaceRootContextType = {
  space: SpaceType;
  viewPostsType: ViewPostsType;
  setViewPostsType: React.Dispatch<React.SetStateAction<ViewPostsType>>;
  screenLoaded: boolean;
  setScreenLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  // getTagsResult: ApiResultType<GetTagsOutputType>;
  currentPost: PostType;
  setCurrentPost: React.Dispatch<React.SetStateAction<PostType>>;
};

export const SpaceRootContext = createContext<SpaceRootContextType>({
  space: void 0,
  viewPostsType: 'grid',
  setViewPostsType: () => {},
  screenLoaded: false,
  setScreenLoaded: () => {},
  // getTagsResult: {
  //   status: 'idling',
  //   data: void 0,
  //   message: '',
  // },
  currentPost: void 0,
  setCurrentPost: () => {},
});

export type ViewPostsType = 'grid' | 'map';

type SpaceRootProviderType = {
  space: SpaceType;
  children: React.ReactNode;
};

export const SpaceRootProvider: React.FC<SpaceRootProviderType> = ({ children, space }) => {
  const { apiResult: getTagsResult, requestApi: requestGetTags } = useGetTags();
  const [viewPostsType, setViewPostsType] = useState<ViewPostsType>('grid');
  const [screenLoaded, setScreenLoaded] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<PostType | undefined>(void 0);

  // useEffect(() => {
  //   requestGetTags({ spaceId: space._id });
  // }, []);

  return (
    <SpaceRootContext.Provider
      value={{
        space,
        viewPostsType,
        setViewPostsType,
        screenLoaded,
        setScreenLoaded,
        // getTagsResult,
        currentPost,
        setCurrentPost,
      }}
    >
      {children}
    </SpaceRootContext.Provider>
  );
};
