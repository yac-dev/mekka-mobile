import React, { useState, createContext } from 'react';
import { SpaceType } from '../../../types';

type SpaceRootContextType = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
  viewPostsType: ViewPostsType;
  setViewPostsType: React.Dispatch<React.SetStateAction<ViewPostsType>>;
  screenLoaded: boolean;
  setScreenLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SpaceRootContext = createContext<SpaceRootContextType>({
  space: void 0,
  setSpace: () => {},
  viewPostsType: 'grid',
  setViewPostsType: () => {},
  screenLoaded: false,
  setScreenLoaded: () => {},
});

export type ViewPostsType = 'grid' | 'map';

export const SpaceRootProvider: React.FC<{ children: React.ReactNode; initialSpace?: SpaceType }> = ({
  children,
  initialSpace,
}) => {
  const [space, setSpace] = useState<SpaceType | undefined>(initialSpace);
  const [viewPostsType, setViewPostsType] = useState<ViewPostsType>('grid');
  const [screenLoaded, setScreenLoaded] = useState<boolean>(false);

  return (
    <SpaceRootContext.Provider
      value={{ space, setSpace, viewPostsType, setViewPostsType, screenLoaded, setScreenLoaded }}
    >
      {children}
    </SpaceRootContext.Provider>
  );
};
