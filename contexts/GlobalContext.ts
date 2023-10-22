import React, { createContext } from 'react';

type AuthDataType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

// type GlobalState = {
//   authData: AuthType | null;
//   jwt: string | null;
// };

// // これ、jwtもいらねーよな。。別に。
// // reducerのためにtypeを作っておく。
// type GlobalAction =
//   | { type: 'SET_AUTH_DATA'; payload: AuthType }
//   | { type: 'SET_JWT'; payload: string }
//   | {
//       type: 'SIGNUP';
//       payload: { authData: { _id: string; name: string; email: string; avatar: string }; jwt: string };
//     }
//   | { type: 'LOAD_ME'; payload: AuthType };

// export const GlobalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
//   switch (action.type) {
//     case 'SET_AUTH_DATA':
//       return { ...state, authData: action.payload };
//     case 'SET_JWT':
//       return { ...state, jwt: action.payload };
//     case 'SIGNUP':
//       return { ...state, authData: action.payload.authData, jwt: action.payload.jwt };
//     case 'LOAD_ME':
//       return { ...state, authData: action.payload };
//     default:
//       return state;
//   }
// };

interface GlobalContextProps {
  authData: AuthDataType;
  setAuthData: React.Dispatch<React.SetStateAction<AuthDataType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isIpad: boolean;
  setIsIpad: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  snackBar: boolean;
  setSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  authData: { _id: '', name: '', email: '', avatar: '' },
  setAuthData: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isIpad: false,
  setIsIpad: () => {},
  loading: false,
  setLoading: () => {},
  snackBar: false,
  setSnackBar: () => {},
});
