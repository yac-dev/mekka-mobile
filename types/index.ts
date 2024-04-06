export type AuthType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  pushToken?: string;
};

export const INITIAL_AUTH = {
  _id: '',
  name: '',
  email: '',
  avatar: '',
  password: '',
  pushToken: '',
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

export type SnackBarType = SnackBarVisibleType | SnackBarInVisibleType;

export type SnackBarVisibleType = {
  isVisible: true;
  status: SnackBarStatusType;
  message: string;
  duration: number;
};

export type SnackBarInVisibleType = {
  isVisible: false;
  status: undefined;
  message: undefined;
  duration: undefined;
};

export const INITIAL_SNACK_BAR: SnackBarType = {
  isVisible: false,
  status: void 0,
  message: void 0,
  duration: void 0,
};

export type ApiStatusType = 'idling' | 'loading' | 'success' | 'fail' | 'error' | 'paging';

// 最初はdata voidだから、?...　genericはあくまでdata用。
export type ApiResultType<T> = {
  status: ApiStatusType;
  data?: T;
  message: '';
};

export type LoadingType = boolean;

export type ReactionType = {
  type: string;
  emoji: string;
  sticker: StickerType;
  caption: string;
  space: SpaceType;
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
  reactions: ReactionType[];
  totalPosts: number;
  totalMembers: number;
  rate: number;
  createdBy: UserType;
  createdAt: string;
  updatedAt: string;
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
};

export type PostType = {
  _id: string;
  contents: ContentType[];
  type: string; // normal or moment
  caption: string;
  space: string;
  createdBy: string;
  disappearAt: string;
  totalComments?: number;
  totalReactions?: number;
  location: LocationType;
};
