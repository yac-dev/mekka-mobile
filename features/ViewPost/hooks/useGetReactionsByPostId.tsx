import { useState } from 'react';
import { ApiResultType } from '../../../types';
import { getReactionStatuses } from '../apis';
import { GetReactionsByPostIdInputType, GetReactionsByPostIdOutputType } from '../types';

export const useGetReactionsByPostId = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetReactionsByPostIdOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetReactionsByPostIdInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getReactionStatuses(input);
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
