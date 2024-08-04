import React, { useState } from 'react';
import { login } from '../apis';
import { View, Text } from 'react-native';
import { ApiResultType, AuthType, UserType } from '../../../types';
import { LoginInput, UseLoginOutput, LoginOutput } from '../types';

export const useLogin = (): UseLoginOutput => {
  const [apiResult, setApiResult] = useState<ApiResultType<LoginOutput>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: LoginInput) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const result = await login(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: result,
        };
      });
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
