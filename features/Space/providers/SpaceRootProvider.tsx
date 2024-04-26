import React, { useState, createContext, useEffect } from 'react';
import { SpaceType, TagType, ApiStatusType, PostType, ApiResultType } from '../../../types';
import { useGetTags } from '../hooks';
import { GetTagsOutputType } from '../types';
import { useCreatePost } from '../../CreateNewPost/hooks';
import { CreatePostInputType, CreatePostOutputType } from '../../CreateNewPost/types';

type SpaceRootContextType = {
  space: SpaceType;
  viewPostsType: ViewPostsType;
  setViewPostsType: React.Dispatch<React.SetStateAction<ViewPostsType>>;
  screenLoaded: boolean;
  setScreenLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  createPostResult: ApiResultType<CreatePostOutputType>;
  requestCreatePost: (input: CreatePostInputType) => void;
  currentPost: PostType;
  setCurrentPost: React.Dispatch<React.SetStateAction<PostType>>;
};

export const SpaceRootContext = createContext<SpaceRootContextType>({
  space: void 0,
  viewPostsType: 'grid',
  setViewPostsType: () => {},
  screenLoaded: false,
  setScreenLoaded: () => {},
  createPostResult: {
    status: 'idling',
    data: void 0,
    message: '',
  },
  requestCreatePost: () => {},
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
  const { apiResult: createPostResult, requestApi: requestCreatePost } = useCreatePost();
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
        createPostResult,
        requestCreatePost,
        // getTagsResult,
        currentPost,
        setCurrentPost,
      }}
    >
      {children}
    </SpaceRootContext.Provider>
  );
};
