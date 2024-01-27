export type EditAccountProps = {
  // routeかな。。。
};

export type UpdateUserInputType = {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

export type UpdateUserOutputType = {
  user: UserType;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
};

export type EditAccountFormType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type StatusType = 'idling' | 'loading' | 'success' | 'error' | 'paging';

export type ApiResultType = {
  status: StatusType;
  data?: UpdateUserOutputType;
  message: string;
};
