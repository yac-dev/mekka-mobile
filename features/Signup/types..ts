import { AuthType, UserType } from '../../types';

export type SignupInputType = {
  name: string;
  email: string;
  password: string;
};

export type SignupOutputType = {
  user: AuthType;
  jwt: string;
};
