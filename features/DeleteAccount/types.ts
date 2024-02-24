export type DeleteMeInput = {
  email: string;
  password: string;
};

export type StatusType = 'idling' | 'loading' | 'success' | 'fail' | 'error' | 'paging';

// dataはTにすべきよね。
export type ApiResultType = {
  status: StatusType;
  data?: void;
  message: '';
};
