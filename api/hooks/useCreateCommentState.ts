import { useState } from 'react';
import { ApiResultType } from '../../types';
import { CreateCommentInputType } from '../types';
import { createComment } from '../post';

export const useCreateCommentState = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<void>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: CreateCommentInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      await createComment(input);
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
