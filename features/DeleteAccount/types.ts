export type DeleteMeInput = {
  email: string;
  password: string;
};

export const INITIAL_FORM_DATA = {
  email: {
    value: '',
    isValidated: false,
  },
  password: {
    value: '',
    isValidated: false,
  },
};

export type FormType<T> = {
  value: T;
  isValidated: boolean;
};

export type FormDataType = {
  email: FormType<string>;
  password: FormType<string>;
};

export type StatusType = 'idling' | 'loading' | 'success' | 'fail' | 'error' | 'paging';

// dataはTにすべきよね。
export type ApiResultType = {
  status: StatusType;
  data?: void;
  message: '';
};
