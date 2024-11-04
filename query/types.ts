import { FormDataType } from '../features/CreateNewPost/contexts/CreateNewPostProvider';
import { FormDataType as CreateNewSpaceFormDataType } from '../features/CreateNewSpace/contexts/CreateNewSpaceProvider';
import { SpaceType, AuthType, UserType, PostType, ReactionType, TagType, StickerType } from '../types';

export type LoadMeInput = {
  jwt: string | undefined;
};

export type LoadMeOutputType = AuthType;

export type GetMySpacesInput = {
  userId: string;
};

export type GetMySpacesOutput = {
  mySpaces: SpaceType[];
};

export type GetLogsByUserIdInputType = {
  userId: string;
};

type TagTable = {
  [key: string]: number;
};

export type GetLogsByUserIdOutputType = {
  logs: {
    [key: string]: TagTable;
  };
  momentLogs: {
    [key: string]: number;
  };
};

export type UpdateSpaceCheckedInDateInputType = {
  spaceId: string;
  userId: string;
};

export type RegisterPushTokenInputType = {
  userId: string;
  pushToken: string;
};

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

export type GetMomentsBySpaceIdInputType = {
  spaceId: string;
};

export type GetMomentsBySpaceIdOutputType = {
  posts?: PostType[];
};

type UserDataPayloadType = {
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
};

export type CreateSpaceInputType = CreateNewSpaceFormDataType & UserDataPayloadType;

export type CreateSpaceOutputType = {
  space: SpaceType;
};

export type GetSpaceBySecretKeyInputType = {
  secretKey: string;
};

export type GetSpaceBySecretKeyOutputType = {
  space?: SpaceType;
};

export type StickerContentType = {
  name: string;
  uri: string;
  type: 'image/jpg';
};

export type PreviewStickerInputType = {
  content: StickerContentType;
};

export type PreviewStickerOutputType = {
  image: string;
};

export type GetStickersInputType = {};

export type GetStickersOutputType = {
  stickers: StickerType[];
};
