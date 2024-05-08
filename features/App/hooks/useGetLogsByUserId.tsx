import { useState } from 'react';
import { ApiResultType, AuthType } from '../../../types';
import { getLogsByUserId } from '../apis';
import { GetLogsByUserIdInputType, GetLogsByUserIdOutputType } from '../types';

export const useGetLogsByUserId = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetLogsByUserIdOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetLogsByUserIdInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getLogsByUserId(input);
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
