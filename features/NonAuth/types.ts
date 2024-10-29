import { UserType, ApiResultType, AuthType } from '../../types';
export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  user: AuthType;
  jwt: string;
};

export type UseLoginOutput = {
  apiResult: ApiResultType<LoginOutput>;
  requestApi: (input: LoginInput) => void;
};

export type ForgotPasswordInput = {
  email: string;
};

export type UseForgotPasswordOutput = {
  apiResult: ApiResultType<void>;
  requestApi: (input: ForgotPasswordInput) => void;
};

export type PINCodeFormType = {
  value: string;
  isValidated: boolean;
};

export type UsePINCodeOutput = {
  PINCodeForm: PINCodeFormType;
  onPINCodeChange: (text: string) => void;
};

export type CheckPINCodeInputType = {
  email: string;
  PINCode: number;
};

export type CheckPINCodeOutputType = {
  email: string;
};

export type PasswordFormType = {
  value: string;
  isValidated: boolean;
};

export type UsePasswordFormOutputType = {
  passwordForm: PasswordFormType;
  onPasswordChange: (text: string) => void;
  isPasswordHidden: boolean;
  onPasswordVisibilityChange: () => void;
};

export type SetNewPasswordInputType = {
  email: string;
  password: string;
};

export type UseSetNewPasswordOutputType = {
  apiResult: ApiResultType<void>;
  requestApi: (input: SetNewPasswordInputType) => void;
};

export type SignupInputType = {
  name: string;
  email: string;
  password: string;
  spaceId?: string;
};

export type SignupOutputType = {
  user: AuthType;
  jwt: string;
};
