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

// export const INITIAL_SNACK_BAR = {
//   isVisible,
// };

// export type SnackBarStatusType = 'success' | 'warning' | 'info' | 'error';

// export type SnackBarType = {
//   isVisible: boolean;
//   status: SnackBarStatusType;
//   message: string;
//   duration: number;
// };
