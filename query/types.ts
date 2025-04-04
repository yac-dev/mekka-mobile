import { FormDataType } from '../features/CreateNewPost/contexts/CreateNewPostProvider';
import { FormDataType as CreateNewSpaceFormDataType } from '../features/CreateNewSpace/contexts/CreateNewSpaceProvider';
import {
  SpaceType,
  AuthType,
  UserType,
  PostType,
  ReactionType,
  TagType,
  StickerType,
  CommentType,
  MapRegionType,
  FollowingRelationshipType,
  NotificationType,
} from '../types';

export type LoadMeInput = {
  jwt: string | undefined;
};

export type LoadMeOutputType = AuthType;

export type GetSpacesByUserIdInput = {
  userId: string;
};

export type GetSpacesByUserIdOutput = {
  spaces: SpaceType[];
};

export type GetLogsByUserIdInputType = {
  userId: string;
};

export type GetNotificationByUserIdInput = {
  userId: string;
  currentPage: number;
};

export type GetNotificationByUserIdOutput = {
  notifications: NotificationType[];
  currentPage: number;
  hasNextPage: boolean;
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

export type GetPostsByUserIdInputType = {
  userId: string;
  spaceId: string;
  currentPage: number;
  postType: 'normal' | 'moment';
};

export type GetPostsByUserIdOutputType = {
  posts: PostType[];
  currentPage: number;
  hasNextPage: number | null;
};

export type GetPostsByUserIdAndRegionInputType = {
  userId: string;
  spaceId: string;
};

export type GetPostsByUserIdAndRegionOutputType = {
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

export type CreateCommentInputType = {
  content: string;
  postId: string;
  userId: string;
  userName: string;
};

export type IncrementReactionInputType = {
  postId: string;
  reactionId: string;
  userId: string;
};

export type IncrementReactionOutputType = {
  reaction: ReactionType;
};

export type CreateCommentOutputType = {
  comment: CommentType;
};

export type GetMomentsBySpaceIdInputType = {
  spaceId: string;
};

export type GetMomentsBySpaceIdOutputType = {
  posts?: PostType[];
};

export type GetReactionsByPostIdInputType = {
  postId: string;
  spaceId: string;
  userId: string;
};

export type GetReactionsByPostIdOutputType = {
  reactions: ReactionType[];
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

export type GetUserByIdInputType = {
  userId: string;
};

export type GetUserByIdOutputType = {
  user: UserType;
};

export type GetCommentsByPostIdInputType = {
  postId: string;
};

export type GetCommentsByPostIdOutputType = {
  comments: CommentType[];
};

export type GetPostsByTagIdAndRegionInput = {
  tagId: string;
  region: MapRegionType;
};

export type GetPostsByTagIdAndRegionOutput = {
  posts: PostType[];
};

export type GetSpaceByIdInputType = {
  _id: string;
};

export type GetSpaceByIdOutputType = {
  space: SpaceType;
};

export type JoinPublicSpaceBySpaceIdInputType = {
  spaceId: string;
  userId: string;
};

export type JoinPublicSpaceBySpaceIdOutputType = {
  space: SpaceType;
};

export type UpdateUserInputType = {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  notificationOpenedAt?: string;
};

export type UpdateUserOutputType = {
  user: UserType;
};

export type UpdateMeInputType = {
  userId: string;
  name?: string;
  email?: string;
  avatar?: string;
  notificationOpenedAt?: string;
};

export type UpdateMeOutputType = {
  user: UserType;
};

export type GetFollowingUsersByUserIdInputType = {
  userId: string;
};

export type GetFollowingUsersByUserIdOutputType = {
  followingUsers: {
    [key: string]: UserType[];
  };
};

export type CreateFollowingRelationshipInputType = {
  followerId: string;
  followeeId: string;
  spaceId: string;
};

export type CreateFollowingRelationshipOutputType = {
  followingRelationship: FollowingRelationshipType;
};

export type DeleteFollowingRelationshipInputType = {
  followerId: string;
  followeeId: string;
  spaceId: string;
};
