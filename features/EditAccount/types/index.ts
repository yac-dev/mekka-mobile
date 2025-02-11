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

export type FormType<T> = {
  // hasChanged: boolean;
  isValidated: boolean;
  value: T;
};

export type EditAccountFormType = {
  name: FormType<string>;
  email: FormType<string>;
  password: FormType<string>;
  avatar: FormType<string>;
};

export const INITIAL_EDIT_ACCOUNT_FORM = {
  name: {
    hasChanged: false,
    isValidated: true,
    value: auth.name,
  },
  email: {
    hasChanged: false,
    isValidated: true,
    value: auth.email,
  },
  password: {
    hasChanged: false,
    isValidated: true,
    value: auth.password,
  },
  avatar: {
    hasChanged: false,
    isValidated: true,
    value: auth.avatar,
  },
};

export type StatusType = 'idling' | 'loading' | 'success' | 'error' | 'paging';

export type ApiResultType = {
  status: StatusType;
  data?: UpdateUserOutputType;
  message: string;
};
