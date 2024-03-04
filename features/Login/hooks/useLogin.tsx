import React, { useState } from 'react';
import { login } from '../apis';
import { View, Text } from 'react-native';
import { ApiResultType, UserType } from '../../../types';
import { LoginInput, UseLoginOutput } from '../types';

export const useLogin = (): UseLoginOutput => {
  const [apiResult, setApiResult] = useState<ApiResultType<UserType>>({
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
          status: 'fail',
        };
      });
    } finally {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'idling',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
