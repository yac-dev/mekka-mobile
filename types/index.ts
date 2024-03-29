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
  name: string;
  email: string;
  avatar: string;
  pushToken?: string;
};

export type IconType = {
  _id: string;
  url: string;
  name: string;
};

export type TagType = {
  _id: string;
  icon: IconType;
  createdBy: UserType;
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

export type StatusType = 'idling' | 'loading' | 'success' | 'fail' | 'error' | 'paging';

// 最初はdata voidだから、?...　genericはあくまでdata用。
export type ApiResultType<T> = {
  status: StatusType;
  data?: T;
  message: '';
};

export type LoadingType = boolean;
