import { SpaceType } from '../../types';

export type GetSpacesOutputType = {
  spaces: SpaceType[];
};

export type GetSpaceByIdInputType = {
  _id: string;
};

export type GetSpaceByIdOutputType = {
  space: SpaceType;
};
