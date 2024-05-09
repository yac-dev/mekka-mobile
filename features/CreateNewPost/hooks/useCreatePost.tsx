import { useState } from 'react';
import { ApiResultType, AuthType } from '../../../types';
import { CreatePostInputType, CreatePostOutputType } from '../types';
import { createPost } from '../apis';

export const useCreatePost = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<CreatePostOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: CreatePostInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await createPost(input);
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
