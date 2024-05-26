import { SpaceType, TagType } from '../../types';

export type GetSpacesOutputType = {
  spaces: SpaceType[];
};

export type GetSpaceByIdInputType = {
  _id: string;
};

export type GetSpaceByIdOutputType = {
  space: SpaceType;
};

export type GetTagsBySpaceIdInputType = {
  spaceId: string;
};

export type GetTagsBySpaceIdOutputType = {
  tags: TagType[];
};
