import { PostType } from '../../types';

export type GetMomentPostsInputType = {
  spaceId: string;
  date: Date;
};

export type GetMomentPostsOutputType = {
  posts?: PostType[];
};
