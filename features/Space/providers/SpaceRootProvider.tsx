import React, { useState, createContext, useEffect } from 'react';
import { SpaceType, TagType, ApiStatusType } from '../../../types';
import { useGetTags } from '../hooks';

type SpaceRootContextType = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
  viewPostsType: ViewPostsType;
  setViewPostsType: React.Dispatch<React.SetStateAction<ViewPostsType>>;
  screenLoaded: boolean;
  setScreenLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  tags: TagType[];
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
  getTagsStatus: ApiStatusType;
};

export const SpaceRootContext = createContext<SpaceRootContextType>({
  space: void 0,
  setSpace: () => {},
  viewPostsType: 'grid',
  setViewPostsType: () => {},
  screenLoaded: false,
  setScreenLoaded: () => {},
  tags: void 0,
  setTags: () => {},
  getTagsStatus: 'idling',
});

export type ViewPostsType = 'grid' | 'map';

type SpaceRootProviderType = {
  children: React.ReactNode;
};

export const SpaceRootProvider: React.FC<SpaceRootProviderType> = ({ children }) => {
  const { apiResult: getTagsResult, requestApi: requestGetTags } = useGetTags();
  const [space, setSpace] = useState<SpaceType | undefined>(void 0);
  const [viewPostsType, setViewPostsType] = useState<ViewPostsType>('grid');
  const [screenLoaded, setScreenLoaded] = useState<boolean>(false);
  const [tags, setTags] = useState<TagType[] | undefined>(void 0);

  return (
    <SpaceRootContext.Provider
      value={{
        space,
        setSpace,
        viewPostsType,
        setViewPostsType,
        screenLoaded,
        setScreenLoaded,
        tags,
        setTags,
        getTagsStatus: getTagsResult.status,
      }}
    >
      {children}
    </SpaceRootContext.Provider>
  );
};
