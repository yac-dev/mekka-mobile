//  基本的に、stateごとにtypeを作っていくことになるかもな。。。
export const GLOBAL_INITIAL_STATE = {
  authData: null,
  jwt: null,
};

type AuthType = {
  name: string;
  email: string;
  avatar: string;
};

export type GlobalState = {
  authData: AuthType | null;
  jwt: string | null;
};

export type GlobalAction = { type: 'SET_AUTH_DATA'; payload: AuthType } | { type: 'SET_JWT'; payload: string };
