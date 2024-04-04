import { PostType, TagType } from '../../types';

export type GetTagsInputType = {
  spaceId: string;
};

export type GetTagsOutputType = {
  tags: TagType[];
};

export type GetPostsInputType = {
  tagId: string;
  currentPage: number;
};

export type GetPostsOutputType = {
  posts: PostType[];
};
