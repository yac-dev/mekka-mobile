import React, { useState } from 'react';
import { ApiResultType } from '../../../types';
import { ForgotPasswordInput, UseForgotPasswordOutput } from '../types';
import { forgotPassword } from '../apis';

export const useForgotPassword = (): UseForgotPasswordOutput => {
  const [apiResult, setApiResult] = useState<ApiResultType<void>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: ForgotPasswordInput) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      await forgotPassword(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: void 0,
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
