import { FormDataType } from '../features/CreateNewPost/contexts';
import { CommentType, UserType, PostType, MapRegionType, ReactionType, TagType, IconType } from '../types';

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
  currentPage: number;
  hasNextPage: number | null;
};

export type GetPostsByTagIdAndRegionInput = {
  tagId: string;
  region: MapRegionType;
};

export type GetPostsByTagIdAndRegionOutput = {
  posts: PostType[];
};

export type CreatePostInputType = FormDataType & {
  userId: string;
  spaceId: string;
  reactions: ReactionType[];
  disappearAfter: string;
};

export type CreatePostOutputType = {
  post: PostType;
  addedTags: string[]; // tagの_idが複数返ってくる。
  createdTags?: TagType[];
};

export type CreateMomentInputType = FormDataType & {
  userId: string;
  spaceId: string;
  reactions: ReactionType[];
  disappearAfter: string;
};

export type CreateMomentOutputType = {
  post: PostType;
};

export type GetTagIconsInputType = {
  name: string;
};

export type GetTagIconsOutputType = {
  icon: IconType;
};

export type GetMomentsBySpaceIdInputType = {
  spaceId: string;
};

export type GetMomentsBySpaceIdOutputType = {
  posts: PostType[];
};

export type GetReactionsByPostIdInputType = {
  postId: string;
};

export type GetReactionsByPostIdOutputType = {
  reactions: ReactionType[];
};

export type CreateReactionByPostIdAndReactionIdAndUserIdInputType = {
  postId: string;
  reactionId: string;
  userId: string;
};

export type CreateReactionByPostIdAndReactionIdAndUserIdOutputType = {
  reactionId: string;
};
