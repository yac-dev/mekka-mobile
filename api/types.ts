import { CommentType, UserType } from '../types';

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
