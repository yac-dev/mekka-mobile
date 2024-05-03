import React, { useState, createContext, useEffect } from 'react';
import { SpaceType, TagType, ApiStatusType, PostType, ApiResultType } from '../../../types';
import { useGetTags } from '../hooks';
import { GetTagsOutputType } from '../types';
import { useCreatePost } from '../../CreateNewPost/hooks';
import { CreatePostInputType, CreatePostOutputType } from '../../CreateNewPost/types';

type LoadedTagScreenTableType = {
  [key: string]: true; // tagId: true
};

type SpaceRootContextType = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
  viewPostsType: ViewPostsType;
  setViewPostsType: React.Dispatch<React.SetStateAction<ViewPostsType>>;
  loadedScreenTable: LoadedTagScreenTableType;
  setLoadedScreenTable: React.Dispatch<React.SetStateAction<LoadedTagScreenTableType>>;
  createPostResult: ApiResultType<CreatePostOutputType>;
  requestCreatePost: (input: CreatePostInputType) => void;
  currentPost: PostType;
  setCurrentPost: React.Dispatch<React.SetStateAction<PostType>>;
};

export const SpaceRootContext = createContext<SpaceRootContextType>({
  space: void 0,
  setSpace: () => {},
  viewPostsType: 'grid',
  setViewPostsType: () => {},
  loadedScreenTable: {},
  setLoadedScreenTable: () => {},
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
  defaultSpace: SpaceType;
  children: React.ReactNode;
};

export const SpaceRootProvider: React.FC<SpaceRootProviderType> = ({ children, defaultSpace }) => {
  const [space, setSpace] = useState<SpaceType>(defaultSpace);
  const { apiResult: getTagsResult, requestApi: requestGetTags } = useGetTags();
  const { apiResult: createPostResult, requestApi: requestCreatePost } = useCreatePost();
  const { apiResult: createMomentResult, requestApi: requestCreateMoment } = useCreatePost();
  const [viewPostsType, setViewPostsType] = useState<ViewPostsType>('grid');
  const [loadedScreenTable, setLoadedScreenTable] = useState<LoadedTagScreenTableType>({
    [defaultSpace.tags[0]._id]: true,
  });
  // 最初のtagはdefaultで入れる。
  const [currentPost, setCurrentPost] = useState<PostType | undefined>(void 0);

  // useEffect(() => {
  //   requestGetTags({ spaceId: space._id });
  // }, []);

  return (
    <SpaceRootContext.Provider
      value={{
        space,
        setSpace,
        viewPostsType,
        setViewPostsType,
        loadedScreenTable,
        setLoadedScreenTable,
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
