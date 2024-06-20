import { CommentType, UserType, PostType, MapRegionType } from '../types';

export type UpdateSpaceCheckedInDateInputType = {
  spaceId: string;
  userId: string;
};

export type GetCommentsByPostIdInputType = {
  postId: string;
};

export type GetCommentsByPostIdOutputType = {
  comments: CommentType[];
};

export type CreateCommentInputType = {
  content: string;
  postId: string;
  userId: string;
};

// 今はなくていいかな・
export type CreateCommentOutputType = {};

export type GetMembersBySpaceIdInputType = {
  spaceId: string;
};

export type GetMembersBySpaceIdOutputType = {
  users: UserType[];
};

export type GetPostsByTagIdInputType = {
  tagId: string;
  currentPage: number;
};

export type GetPostsByTagIdOutputType = {
  posts: PostType[];
  nextPage: number | null;
};

export type GetPostsByTagIdAndRegionInput = {
  tagId: string;
  region: MapRegionType;
};

export type GetPostsByTagIdAndRegionOutput = {
  posts: PostType[];
};
