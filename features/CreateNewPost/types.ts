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
  addedTags: TagType[];
  createdTags?: TagType[];
};

export type GetTagIconsInputType = {
  name: string;
};

export type GetTagIconsOutputType = {
  icon: IconType;
};
