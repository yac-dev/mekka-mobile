import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ApiResultType } from '../../../types';
import { setNewPassword } from '../apis';
import { SetNewPasswordInputType } from '../types';
import { UseSetNewPasswordOutputType } from '../types';

export const useSetNewPassword = (): UseSetNewPasswordOutputType => {
  const [apiResult, setApiResult] = useState<ApiResultType<void>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: SetNewPasswordInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const result = await setNewPassword(input);
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
          data: void 0,
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
