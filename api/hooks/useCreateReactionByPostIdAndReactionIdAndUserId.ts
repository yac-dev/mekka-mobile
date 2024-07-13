import { useState } from 'react';
import { createReactionByPostIdAndReactionIdAndUserId } from '../apis';
import {
  CreateReactionByPostIdAndReactionIdAndUserIdInputType,
  CreateReactionByPostIdAndReactionIdAndUserIdOutputType,
} from '../types';
import { ApiResult } from '../../types';

export const useCreateReactionByPostIdAndReactionIdAndUserId = () => {
  const [apiResult, setApiResult] = useState<ApiResult<CreateReactionByPostIdAndReactionIdAndUserIdOutputType>>({
    status: 'loading',
    data: void 0,
  });

  const requestApi = async (input: CreateReactionByPostIdAndReactionIdAndUserIdInputType) => {
    try {
      console.log('hey');
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await createReactionByPostIdAndReactionIdAndUserId(input);
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
          status: 'error',
          data: void 0,
          message: 'OOPS. Something went wrong...',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
