import { PostType } from '../../types';

export type GetMomentPostsInputType = {
  spaceId: string;
};

export type GetMomentPostsOutputType = {
  posts?: PostType[];
};
