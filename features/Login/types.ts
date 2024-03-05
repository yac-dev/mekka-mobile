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

export type ForgotPasswordInput = {
  email: string;
};

export type UseForgotPasswordOutput = {
  apiResult: ApiResultType<void>;
  requestApi: (input: ForgotPasswordInput) => void;
};