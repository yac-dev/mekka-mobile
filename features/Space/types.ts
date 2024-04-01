import { TagType } from '../../types';

export type GetTagsInputType = {
  spaceId: string;
};

export type GetTagsOutputType = {
  tags: TagType[];
};
