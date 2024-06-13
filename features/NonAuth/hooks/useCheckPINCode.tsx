import React, { useState } from 'react';
import { ApiResultType } from '../../../types';
import { CheckPINCodeInputType, CheckPINCodeOutputType } from '../types';
import { checkPINCode } from '../apis';

export const useCheckPINCode = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<CheckPINCodeOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: CheckPINCodeInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const result = await checkPINCode(input);
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
