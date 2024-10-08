import React, { useContext, useState } from 'react';
import { ApiResultType } from '../../../types';
import { SignupInputType, SignupOutputType } from '../types';
import { signup } from '../apis';
import * as SecureStore from 'expo-secure-store';
import { authAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';

type UseSignupStateOutputType = {
  apiResult: string;
};

// await SecureStore.setItemAsync('secure_token', loginOutput.jwt);
//     setAuth(loginOutput.user);
//     navigation.navigate('HomeStackNavigator');
//     setSnackBar({
//       isVisible: true,
//       status: 'success',
//       message: 'Logged in successfully.',
//       duration: 5000,
//     });

export const useSignupState = () => {
  const [, setAuth] = useRecoilState(authAtom);
  const [apiResult, setApiResult] = useState<ApiResultType<void>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  // simpleにこういうものの場合は、stateに入れる必要もないよな。ただ結果が欲しいだけでさ。。。
  // stateで持っておく必要はないと思うのよね。。。
  const requestApi = async (input: SignupInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await signup(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: void 0,
        };
      });
      await SecureStore.setItemAsync('secure_token', response.jwt);
      setAuth(response.user);
    } catch (error) {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'error',
          message: 'OOPS. Something went wrong with your email or password. Please try again.',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
