import { PostType, TagType, IconType, ReactionType } from '../../types';
import { FormDataType } from './contexts';

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
