import React, { useState, createContext, useEffect } from 'react';
import { SpaceType, TagType, ApiStatusType, PostType, ApiResultType } from '../../../types';
import { useCreateMoment } from '../../CreateNewPost/hooks/useCreateMoment';

import {
  CreateMomentInputType,
  CreateMomentOutputType,
  CreatePostInputType,
  CreatePostOutputType,
} from '../../CreateNewPost/types';

type MomentsContextType = {
  space: SpaceType;
  createMomentResult: ApiResultType<CreateMomentOutputType>;
  requestCreateMoment: (input: CreateMomentInputType) => void;
};

export const MomentsContext = createContext<MomentsContextType>({
  space: void 0,
  createMomentResult: {
    status: 'idling',
    data: void 0,
    message: '',
  },
  requestCreateMoment: () => {},
});

type MomentsProviderType = {
  defaultSpace: SpaceType;
  children: React.ReactNode;
};

export const MomentsProvider: React.FC<MomentsProviderType> = ({ children, defaultSpace }) => {
  const [space, setSpace] = useState<SpaceType>(defaultSpace);
  const { apiResult: createMomentResult, requestApi: requestCreateMoment } = useCreateMoment();

  return (
    <MomentsContext.Provider
      value={{
        space,
        createMomentResult,
        requestCreateMoment,
      }}
    >
      {children}
    </MomentsContext.Provider>
  );
};
