export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  pushToken?: string;
};

export type LoadMeOutputType = {
  user: UserType;
};

// relationshipで持つ必要ないと思う。
export type SpaceType = {
  _id: string;
};

export type GetSpacesOutputType = {
  spaces: SpaceType[];
};

export type StatusType = 'idling' | 'loading' | 'success' | 'error' | 'paging';

export type ApiResultType = {
  status: StatusType;
  data?: LoadMeOutputType;
  message: '';
};
