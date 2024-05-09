import { useState } from 'react';
import { loadMe } from '../apis/loadMe';
import { ApiResultType, AuthType } from '../../../types';
import { LoadMeInput } from '../types';

export const useLoadMe = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<AuthType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: LoadMeInput) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await loadMe(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'fail',
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
