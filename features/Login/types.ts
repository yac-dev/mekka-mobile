import { UserType, ApiResultType } from '../../types';
export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = UserType;

export type UseLoginOutput = {
  apiResult: ApiResultType<UserType>;
  requestApi: (input: LoginInput) => void;
};
