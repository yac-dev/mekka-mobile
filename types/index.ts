export type AuthData = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  pushToken?: string;
};

export const INITIAL_AUTH_DATA = {
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

export type SnackBarStatusType = 'success' | 'warning' | 'info' | 'error' | undefined;

export type SnackBarType = {
  isVisible: boolean;
  status: SnackBarStatusType;
  message: string | undefined;
  duration: number;
};

export const INITIAL_STATUS_BAR: SnackBarType = {
  isVisible: false,
  status: void 0,
  message: undefined,
  duration: undefined,
};

export type StatusType = 'idling' | 'loading' | 'success' | 'fail' | 'error' | 'paging';

// 最初はdata voidだから、?...　genericはあくまでdata用。
export type ApiResultType<T> = {
  status: StatusType;
  data?: T;
  message: '';
};
