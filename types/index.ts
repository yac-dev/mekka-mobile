export type AuthType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  pushToken?: string;
  createdAt: string;
  notificationOpenedAt: string;
  hasNewNotification: boolean;
};

export const INITIAL_AUTH = {
  _id: '',
  name: '',
  email: '',
  avatar: '',
  password: '',
  pushToken: '',
  notificationOpenedAt: '',
  hasNewNotification: false,
};

export type UserType = {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
  pushToken?: string;
};

export type IconType = {
  _id: string;
  url: string;
  name: string;
};

export type TagType = {
  _id: string;
  name: string;
  icon: IconType;
  color: string;
  count: number;
  space: SpaceType;
  updatedAt: string;
  createdBy: UserType;
  type: string[]; // ['photo', 'video']
};

export type MapRegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type StickerType = {
  url: string;
  name: string;
  createdBy: UserType;
  isPublic: boolean;
};

export type SnackBarStatusType = 'success' | 'warning' | 'info' | 'error';

export type SnackBarType = {
  isVisible: boolean;
  status?: SnackBarStatusType;
  message?: string;
  duration?: number;
};

export const INITIAL_SNACK_BAR: SnackBarType = {
  isVisible: false,
  status: void 0,
  message: void 0,
  duration: void 0,
};

export type ApiStatusType = 'idling' | 'loading' | 'success' | 'fail' | 'error' | 'paging' | 'refreshing';

// 最初はdata voidだから、?...　genericはあくまでdata用。
export type ApiResultType<T> = {
  status: ApiStatusType;
  data?: T;
  message: string;
};

export type IdleType = {
  status: 'idle';
  data: undefined;
};

export type LoadingType<T> = {
  status: 'loading';
  data: T;
};
export type RefreshingType<T> = {
  status: 'refreshing';
  data: T;
};

// このTは、outputの形によるっていうことよね。

export type ErrorType = {
  status: 'error';
  data: undefined;
  message: string;
};
export type PagingType<T> = { status: 'paging'; data: T };
export type SuccessType<T> = { status: 'success'; data: T };

export type ApiResult<T> = IdleType | LoadingType<T> | SuccessType<T> | PagingType<T> | RefreshingType<T> | ErrorType;

export type ReactionType = {
  _id: string;
  type: string;
  emoji: string;
  sticker: StickerType;
  caption: string;
  space: SpaceType;
  count?: number;
  reactedByCurrentUser?: boolean;
};

export type ReactionStatus = {
  post: string;
  reaction: ReactionType;
  count: number;
};

export type SpaceType = {
  _id: string;
  name: string;
  icon: string; // s3のlink
  secretKey: string;
  contentType: string;
  defaultTag: TagType;
  description: string;
  videoLength: number;
  disappearAfter: number; // ここはminuteでいく。5, 60, 600, 1440って感じ。
  isPublic: boolean;
  isCommentAvailable: boolean;
  isReactionAvailable: boolean;
  isFollowAvailable: boolean;
  reactions: ReactionType[];
  totalPosts: number;
  totalMembers: number;
  rate: number;
  createdBy: UserType;
  createdAt: string;
  updatedAt: string;
  tags: TagType[];
  lastCheckedIn: string;
};

export type SpaceAndUserRelationshipType = {
  user: UserType;
  space: SpaceType;
};

export type SpaceUpdatesType = {};

export type PostFormType = {
  postType: string;
  contents: [];
  caption: string;
  dummyCreatedTagId: 1;
  addedTags: {};
  tagOptions: [];
  addedLocationTag: null;
  location: null;
  locationTagOptions: [];
  moments: [];
};

export const INITIAL_POST_FORM_DATA: PostFormType = {
  postType: '',
  contents: [],
  caption: '',
  dummyCreatedTagId: 1,
  addedTags: {},
  tagOptions: [],
  addedLocationTag: null,
  location: null,
  locationTagOptions: [],
  moments: [],
};

export type LocationType = {
  type: string;
  coordinates: number[];
};

export type ContentType = {
  data: string; // urlのdata
  type: string; // photo or video
  post: PostType; // これいらねーな多分。
  duration: number;
  createdBy: UserType;
  createdAt: string;
  thumbnail: string;
};

export type PostType = {
  _id: string;
  contents: ContentType[];
  type: string; // normal or moment
  caption: string;
  space: string;
  createdBy: UserType;
  disappearAt: string;
  createdAt: string;
  totalComments?: number;
  totalReactions?: number;
  location: LocationType;
  tags: TagType[];
};

export type CommentType = {
  _id: string;
  content: string;
  post: PostType;
  replyCount: number;
  createdBy: UserType;
  createdAt: string;
};

export type ReplyType = {
  _id: string;
  to: UserType;
  content: string;
  comment: CommentType;
  createdBy: UserType;
  createdAt: string;
};

export type LogsTagTableType = {
  [key: string]: number;
};

export type LogsTableType = {
  [key: string]: LogsTagTableType;
};

export type MomentLogsType = {
  [key: string]: number;
};

export type FollowingRelationshipType = {
  _id: string;
  followerId: string;
  followeeId: string;
  space: string;
  createdAt: string;
};

export type NotificationType = {
  _id: string;
  type: string; // 'comment', 'reaction', 'follow'
  space: SpaceType;
  createdAt: string;
  post: PostType;
  comment?: CommentType;
  reaction?: ReactionType;
  follower?: UserType;
  createdBy: UserType;
  isRead: boolean;
};
