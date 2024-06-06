import { useState } from 'react';
import { ApiResultType } from '../../types';
import { GetCommentsByPostIdInputType, GetCommentsByPostIdOutputType } from '../types';
import { getCommentsByPostId } from '../get';

export const useGetCommentsByPostIdState = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetCommentsByPostIdOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetCommentsByPostIdInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getCommentsByPostId(input);
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
